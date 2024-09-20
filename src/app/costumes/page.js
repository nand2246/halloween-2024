"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const costume_ideas = [
  "kamala harris + coconut",
  "donald trump + biden",
  "brat + charli xcx",
  "ai charlie & the chocolate factory",
  "smoking duck",
  "sabrina carpenter + espresso",
  "orlando baby + four seasons",
  "ariana grande + spongebob",
  "spongebob + patrick",
  "(group) → taylor swift eras",
  "chapell roan + pink pony",
  "donald trump getting shot",
  "taylor and a red scarf",
  "cowboy carter",
  "bruno mars and las vegas",
  "bruno mars and lady gaga",
  "harley quinn and joker lady gaga version",
  "iphone and hot chip",
  "deadpool and wolverine",
  "jojo siwa",
  "nikocado avocado",
  "challengers",
  "inside out 2",
  "the bear",
  "reality tv shows",
  "wednesday",
  "scott pilgrim",
  "taylor swift and travis kelce",
  "ice spice and pinkpantheress",
  "mr. beast and youtube",
  "pride flags",
  "pup + master",
  "lana del rey and waffle house",
  "jojo siwa",
  "kate middleton and cancer",
  "barbie and ken",
  "kendrick and drake",
  "drake and millie",
  "glinda and elphaba (wicked)",
  "saltbrun",
  "avatar ",
  "percy jackson ",
  "kyle + rock wall",
  "ethan + peanut",
  "clara + sonic",
  "seasons",
  "nicole + boat",
  "tree + fire (forest fire)",
  "alberta + water",
  "hatsune miku",
  "beauty and the beast",
  "dress up as one of ur friends/ each other",
  "your fav childhood show",
  "powerpuff girls",
  "totally spies",
  "fairly odd parents",
  "adventure time",
  "fav albums",
  "fav meme",
  "trad wife content creator (nara smith, lucky blue, etc)",
  "hawk tuah",
  "beetlejuice ",
  "australian olympic breakdancer",
  "river (la seine) and poop",
  "hotel translvania",
];

async function fetchIdea() {
  return costume_ideas[Math.floor(Math.random() * costume_ideas.length)];
}

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
