'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidGlassCard } from '@/components/ui/liquid-notification';

const commissionValues = ['47,00', '197,00', '257,00', '19,90', '37,90'];

const getRandomCommission = () => {
  return commissionValues[Math.floor(Math.random() * commissionValues.length)];
};

const notificationTypes = [
  {
    type: 'sale',
    icon: 'https://s3.typebot.io/public/workspaces/cme0in7zf0022jo04wbcry6pa/typebots/cmeqkb6ac0007ji04gxy4m02s/blocks/kwzzsi7nt34repq7p1cpo9ts?v=1756426931803',
    title: 'Venda Realizada',
    description: (commission: string) => `Sua comissão: R$ ${commission}`,
  },
  {
    type: 'followers',
    icon: 'https://s3.typebot.io/public/workspaces/cme0in7zf0022jo04wbcry6pa/typebots/cmeqkb6ac0007ji04gxy4m02s/blocks/awdexqtujuj8ef9o1d3ms9gn?v=1756719010878',
    title: 'Tik Tok',
    description: () => 'Ganhou mais 1000 seguidores',
  },
];

const FallingNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const initial: any[] = [];
    for (let i = 0; i < 4; i++) {
        const typeIndex = i % notificationTypes.length;
        const type = notificationTypes[typeIndex];
        const commission = getRandomCommission();
        initial.push({
            id: i,
            type: type.type,
            icon: type.icon,
            title: type.title,
            description: type.description(commission),
        });
    }
    setNotifications(initial.reverse());
    
    let nextId = 4;
    let nextTypeIndex = 0;

    const interval = setInterval(() => {
        setNotifications(prev => {
            const type = notificationTypes[nextTypeIndex % notificationTypes.length];
            const commission = getRandomCommission();
    
            const newNotif = {
                id: nextId++,
                type: type.type,
                icon: type.icon,
                title: type.title,
                description: type.description(commission),
            };
    
            nextTypeIndex++;
            
            const newQueue = [newNotif, ...prev.slice(0, 3)];
            return newQueue;
        });
    }, 2000); 

    return () => clearInterval(interval);
  }, []);
  
  const getDisplayTime = (index: number) => {
    const times = ['agora', '1m', '2m', '3m'];
    return times[index] || `${index+1}m`;
  }

  return (
    <div className="w-full h-full flex flex-col justify-end items-center space-y-4 pb-28">
      <AnimatePresence initial={false}>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0.5, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-full max-w-xs"
          >
            <LiquidGlassCard
              className="p-3 animate-pulse-glow"
              borderRadius="16px"
              blurIntensity="md"
              shadowIntensity="sm"
              glowIntensity="xs"
              draggable={false}
            >
              <div className="flex items-start text-left">
                <div className="flex-shrink-0 mr-3">
                  <img
                    src={notification.icon}
                    alt="Ícone do App"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-sm text-white truncate">{notification.title}</p>
                  <p className="text-xs text-gray-200 truncate">
                    {notification.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400 ml-2">{getDisplayTime(index)}</span>
              </div>
            </LiquidGlassCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingNotifications;
