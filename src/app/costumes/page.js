"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const costume_ideas = [
  "kamala harris and a coconut",
  "sabrina carpenter and espresso",
  "orlando baby and four seasons",
  "ariana grande and spongebob",
  "spongebob and patrick",
  "taylor swift's eras",
  "chappell roan and pink pony",
  "bruno mars and las vegas",
  "harley quinn and joker (lady gaga version)",
  "deadpool and wolverine",
  "challengers",
  "inside out emotions",
  "the bear characters",
  "taylor swift and travis kelce",
  "ice spice and pinkpantheress",
  "pride flags",
  "pup and master",
  "lana del rey and waffle house",
  "barbie and ken",
  "kendrick and drake",
  "glinda and elphaba (wicked)",
  "avatar: the last airbender",
  "kyle and a rock wall",
  "ethan and peanut",
  "clara and sonic",
  "hatsune miku",
  "one of your friends",
  "powerpuff girls",
  "totally spies",
  "fairly odd parents",
  "adventure time",
  "trad wife content creator (e.g. nara smith)",
  "hawk tuah",
  "beetlejuice",
  "the river seine and poop",
  "my little pony characters",
];

function fetchIdea() {
  return costume_ideas[Math.floor(Math.random() * costume_ideas.length)];
}

export default function Costumes() {
  let [idea, setIdea] = useState();
  let [count, setCount] = useState(true);

  function handleNewIdea() {
    setCount(count + 1);
    setIdea(fetchIdea());
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
            className="absolute w-full bottom-0 text-3xl font-bold text-center mb-10"
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
      delay: 0.1,
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
      duration: 0.3,
    },
  },
};
