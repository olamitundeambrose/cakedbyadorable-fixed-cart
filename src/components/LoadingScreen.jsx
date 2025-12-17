import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Cake */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              {/* Cake Stack */}
              <div className="relative w-32 h-32 mx-auto">
                {/* Top Layer */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-br from-rose-300 to-rose-200 rounded-t-full shadow-lg"
                >
                  {/* Cherry on top */}
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      y: [0, -3, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-green-600 rounded-full" />
                  </motion.div>
                  {/* Candle */}
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                  >
                    <div className="w-1.5 h-6 bg-gradient-to-b from-yellow-100 to-blue-300 rounded-full shadow-sm" />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-orange-400 rounded-full blur-[2px]"
                    />
                    <motion.div
                      animate={{ 
                        y: [0, -3, 0],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ 
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-yellow-400 rounded-full blur-[1px]"
                    />
                  </motion.div>
                </motion.div>

                {/* Middle Layer */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 w-26 h-10 bg-gradient-to-br from-amber-200 to-amber-100 rounded-md shadow-lg"
                >
                  {/* Frosting drips */}
                  <div className="absolute -bottom-1 left-2 w-3 h-2 bg-rose-200 rounded-b-full" />
                  <div className="absolute -bottom-1 left-8 w-2 h-2 bg-rose-200 rounded-b-full" />
                  <div className="absolute -bottom-1 right-3 w-3 h-2 bg-rose-200 rounded-b-full" />
                </motion.div>

                {/* Bottom Layer */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-gradient-to-br from-stone-300 to-stone-200 rounded-lg shadow-xl"
                >
                  {/* Decorative dots */}
                  <div className="absolute top-2 left-4 w-2 h-2 bg-rose-300 rounded-full" />
                  <div className="absolute top-4 left-8 w-1.5 h-1.5 bg-amber-300 rounded-full" />
                  <div className="absolute top-2 right-4 w-2 h-2 bg-rose-300 rounded-full" />
                  <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-amber-300 rounded-full" />
                  <div className="absolute bottom-3 right-6 w-1.5 h-1.5 bg-amber-300 rounded-full" />
                </motion.div>

                {/* Sparkles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-amber-400"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                    }}
                  />
                ))}
              </div>

              {/* Plate */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="w-40 h-3 bg-gradient-to-br from-stone-200 to-stone-100 rounded-full mx-auto shadow-md"
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-serif font-medium text-stone-800">
                Creative Cakes
              </h2>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-stone-500"
              >
                Baking something special...
              </motion.div>
            </motion.div>

            {/* Loading Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    backgroundColor: ["#d4a574", "#e8b298", "#d4a574"]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}