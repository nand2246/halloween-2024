"use client";
import { useState } from "react";
import { fetchIdea } from "./actions";
import { AnimatePresence, motion } from "framer-motion";

export default function Costumes() {
  let [idea, setIdea] = useState();
  let [count, setCount] = useState(true);

  async function handleNewIdea() {
    setCount(count + 1);
    setIdea(await fetchIdea());
  }

  return (
    <div className="flex flex-col h-[calc(100vh-74px)]">
      <div className="relative flex-1 h-28 content-end">
        <AnimatePresence>
          <motion.div
            key={count}
            variants={variants}
            initial="hide"
            animate="in"
            exit="out"
            className="absolute w-screen bottom-0 text-3xl font-bold text-center mb-10"
          >
            {idea ? `${idea}` : "click button to see a random costume idea"}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex-1 text-center">
        <button
          className="rounded-md outline outline-black outline-2 p-3"
          onClick={handleNewIdea}
        >
          new idea
        </button>
      </div>
    </div>
  );
}

export const variants = {
  in: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.6,
      duration: 1,
      delay: 0.5,
    },
  },
  hide: {
    y: -200,
    opacity: 0,
  },
  out: {
    y: 200,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
