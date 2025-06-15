import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  direction: 'left' | 'right';
}

const AnimatedBackground: React.FC = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cloudCount = 8; // Reduced number for softer effect

  const colors = [
    'from-blue-200/30 to-cyan-200/30',
    'from-purple-200/30 to-pink-200/30',
    'from-cyan-200/30 to-blue-200/30',
    'from-pink-200/30 to-purple-200/30',
    'from-sky-200/30 to-indigo-200/30',
    'from-indigo-200/30 to-sky-200/30',
  ];

  const generateCloud = (): Cloud => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 400 + Math.random() * 800, // Larger, softer clouds
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: 30 + Math.random() * 40,
    direction: Math.random() > 0.5 ? 'left' : 'right',
  });

  useEffect(() => {
    const initialClouds = Array.from({ length: cloudCount }, generateCloud);
    setClouds(initialClouds);

    const animateClouds = () => {
      setClouds(prevClouds => {
        return prevClouds.map(cloud => {
          let newX = cloud.x;
          
          if (cloud.direction === 'right') {
            newX += 0.08; // Slower movement
            if (newX > 120) {
              return generateCloud();
            }
          } else {
            newX -= 0.08;
            if (newX < -20) {
              return generateCloud();
            }
          }

          return {
            ...cloud,
            x: newX,
          };
        });
      });
    };

    const interval = setInterval(animateClouds, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div ref={containerRef} className="relative w-full h-full">
        {clouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }} // Reduced opacity
            transition={{ duration: 3 }}
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              width: cloud.size,
              height: cloud.size * 0.6,
            }}
            className={`absolute rounded-full bg-gradient-to-r ${cloud.color} blur-[120px]`} // Increased blur
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
