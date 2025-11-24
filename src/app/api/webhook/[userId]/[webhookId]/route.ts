
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; webhookId: string } }
) {
  try {
    const { userId, webhookId } = params;

    if (!userId || !webhookId) {
      return NextResponse.json({ error: 'Missing userId or webhookId' }, { status: 400 });
    }

    const body = await req.json();
    
    // Assuming a simple payload like { "price": 97.50 }
    // Production webhooks will have more complex structures.
    const price = body.price;

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Invalid or missing price in request body' }, { status: 400 });
    }

    const userRef = db.collection('users').doc(userId);
    const webhookRef = userRef.collection('webhooks').doc(webhookId);
    
    // Check if the webhook exists and belongs to the user
    const webhookDoc = await webhookRef.get();
    if (!webhookDoc.exists) {
        return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });
    }

    // Atomically update the user's balance
    await userRef.update({
      balance: FieldValue.increment(price)
    });

    return NextResponse.json({ success: true, message: `User ${userId} balance updated.` });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
