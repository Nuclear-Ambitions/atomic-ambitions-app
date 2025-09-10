"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { statementSets } from "../../lib/data/statements";
import { ArrowFatRightIcon } from "@phosphor-icons/react";

export default function NeutronTales() {
  const router = useRouter();
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [visibleStatements, setVisibleStatements] = useState<string[]>([]);
  const [showContinue, setShowContinue] = useState(false);
  const [isFirstSet, setIsFirstSet] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const currentStatements = statementSets[currentSetIndex];
    let timer: NodeJS.Timeout;

    // Wait for transition to complete before starting next set
    if (isTransitioning) {
      timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Wait for fade-out duration
      return () => clearTimeout(timer);
    }

    if (visibleStatements.length < currentStatements.length) {
      // First statement of first set: 3-second delay
      // First statement of subsequent sets: immediate (after previous set fades)
      // Subsequent statements in same set: 3-second delay
      const delay =
        visibleStatements.length === 0 && isFirstSet
          ? 3000
          : visibleStatements.length === 0
          ? 0
          : 3000;

      timer = setTimeout(() => {
        setVisibleStatements(
          currentStatements.slice(0, visibleStatements.length + 1)
        );
        // Mark that we're no longer on the first set after showing first statement
        if (visibleStatements.length === 0 && isFirstSet) {
          setIsFirstSet(false);
        }
      }, delay);
    }

    // Show continue button 3 seconds after last statement
    if (
      visibleStatements.length === currentStatements.length &&
      currentStatements.length > 0
    ) {
      timer = setTimeout(() => {
        setShowContinue(true);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [visibleStatements, currentSetIndex, isFirstSet, isTransitioning]);

  // Add keyboard event listener for right arrow key
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && showContinue) {
        handleContinue();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showContinue]);

  const handleContinue = () => {
    if (currentSetIndex < statementSets.length - 1) {
      setIsTransitioning(true);
      setCurrentSetIndex(currentSetIndex + 1);
      setVisibleStatements([]);
      setShowContinue(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen relative max-w-screen-lg mx-auto">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full">
        <div className="flex items-center justify-center w-32 h-32 mx-auto">
          <div className="w-4 h-4 bg-[#fefadc] rounded-full"></div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full">
        <div className="flex flex-col items-center gap-2 text-center max-w-2xl px-8 mx-auto">
          <AnimatePresence>
            {visibleStatements.map((statement, index) => (
              <motion.p
                key={`${currentSetIndex}-${index}`}
                className="text-lg mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}>
                {statement}
              </motion.p>
            ))}
          </AnimatePresence>
          {showContinue && (
            <motion.div
              className="flex flex-col items-center gap-2 mt-12 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}>
              <motion.button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleContinue}>
                <ArrowFatRightIcon weight="duotone" />
              </motion.button>
              <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Press → to continue
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
