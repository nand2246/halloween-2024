"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const cocktails = [
  {
    name: "jack o' spice",
    ingredients: ["vodka", "pumpkin spice creamer", "kahlúa", "graham cracker"],
    color: "#eaac5b",
  },
  {
    name: "blood shot",
    ingredients: ["whisky", "sour apple schnapps", "cranberry juice"],
    color: "#98292e",
  },
  {
    name: "witches brew",
    ingredients: [
      "vodka",
      "limes",
      "seltzer water",
      "midori melon liqueur",
      "coconut water",
    ],
    color: "#8ace00",
  },
  {
    name: "black widow",
    ingredients: [
      "blackberries",
      "rosemary",
      "lemon",
      "honey",
      "tequila",
      "orange",
      "sparkling water",
    ],
    color: "#2a1115",
    textColor: "white",
  },
];

function CocktailCard({ name, ingredients, color, textColor, index }) {
  const [show, setShow] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1 * index } }}
      className={`w-full mb-8 p-4 outline outline-2 rounded-md text-center`}
      style={{
        backgroundColor: color,
        color: textColor ? textColor : "inherit",
      }}
    >
      <div className="text-center text-4xl sm:text-5xl my-8 font-normal">
        {name}
      </div>
      <button
        onClick={() => setShow(!show)}
        className="outline outline-2 rounded-md px-2 py-1.5 m-2"
      >
        see details
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: "fit-content",
              transition: {
                type: "linear",
                duration: 0.3,
                bounce: 0.5,
              },
            }}
            exit={{
              height: 0,
              transition: {
                delay: 0.3,
                duration: 0.3,
              },
            }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  type: "linear",
                  delay: 0.3,
                  duration: 0.3,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              className="font-light mb-4 pt-4 sm:text-3xl"
            >
              ingredients:
            </motion.h1>
            {ingredients.map((ingredient, index) => (
              <motion.p
                key={ingredient}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    type: "linear",
                    delay: 0.4 + 0.1 * index,
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="p-1"
              >
                {ingredient}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Cocktails() {
  return (
    <div className="pb-10 pt-3 md:pt-6 mx-3 md:mx-auto max-w-screen-md">
      {cocktails.length > 0 &&
        cocktails.map((cocktail, index) => (
          <CocktailCard
            key={cocktail.name}
            name={cocktail.name}
            ingredients={cocktail.ingredients}
            color={cocktail.color}
            textColor={cocktail.textColor ? cocktail.textColor : undefined}
            index={index + 1}
          />
        ))}
    </div>
  );
}
