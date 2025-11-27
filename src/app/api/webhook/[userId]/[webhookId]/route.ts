
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

// Helper to get date in YYYY-MM-DD format
const getFormattedDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; webhookId: string } }
) {
  try {
    const { userId, webhookId } = params;

    if (!userId || !webhookId) {
      return NextResponse.json({ error: 'Missing userId or webhookId' }, { status: 400 });
    }
    
    // 1. Validate User and Webhook
    const userRef = db.collection('users').doc(userId);
    const webhookRef = userRef.collection('webhooks').doc(webhookId);
    
    const [userDoc, webhookDoc] = await Promise.all([
        userRef.get(),
        webhookRef.get()
    ]);

    if (!userDoc.exists) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (!webhookDoc.exists) {
        return NextResponse.json({ error: 'Webhook configuration not found' }, { status: 404 });
    }

    const body = await req.json();
    
    // Example payload: { "transactionId": "xyz", "price": 97.50, "status": "paid" | "pending" }
    const { transactionId, price, status } = body;

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Invalid or missing price in request body' }, { status: 400 });
    }
     if (!transactionId) {
      return NextResponse.json({ error: 'Missing transactionId' }, { status: 400 });
    }
     if (!status || !['paid', 'pending', 'refunded', 'failed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid or missing status' }, { status: 400 });
    }

    const saleRef = userRef.collection('sales').doc(transactionId);
    
    // 2. Create or update sale record
    await saleRef.set({
        id: transactionId,
        price: price,
        status: status,
        receivedAt: FieldValue.serverTimestamp(),
    }, { merge: true });


    // 3. If payment is successful, atomically update the user's balance and daily earnings
    if (status === 'paid') {
        const saleDoc = await saleRef.get();
        const saleData = saleDoc.data();
        // Check if it was pending before to avoid double counting
        if (saleData && saleData.status !== 'paid') {
           const today = getFormattedDate();
           const earningRef = userRef.collection('earnings').doc(today);

           await db.runTransaction(async (transaction) => {
               const earningDoc = await transaction.get(earningRef);

               // Update user's total balance
               transaction.update(userRef, { balance: FieldValue.increment(price) });

               // Update daily earnings
               if (earningDoc.exists) {
                   transaction.update(earningRef, { amount: FieldValue.increment(price) });
               } else {
                   transaction.set(earningRef, { date: today, amount: price });
               }
           });
        }
    }

    return NextResponse.json({ success: true, message: `Sale ${transactionId} processed for user ${userId}.` });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
