"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchIngredients, setVolunteer } from "./actions";

function IngredientCard({ id, name, volunteer, color, index }) {
  const [expanded, setExpanded] = useState(false);
  const [volunteerInput, setVolunteerInput] = useState("");
  const [volunteerName, setVolunteerName] = useState(volunteer);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1 * index } }}
      className={`w-full mb-8 p-4 outline outline-2 rounded-md text-center`}
      style={{
        backgroundColor: color,
      }}
    >
      <div className="text-center text-4xl sm:text-5xl my-8 font-normal">
        {name}
      </div>
      {volunteerName && (
        <h2 className="mb-4">
          {volunteerName} is bringing {name}
        </h2>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="outline outline-2 rounded-md px-2 py-1.5 m-2"
      >
        {volunteerName ? `i am ${volunteerName}` : `i want to bring this`}
      </button>

      <AnimatePresence>
        {expanded && (
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.3,
                  type: "linear",
                  duration: 0.3,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              className="pt-6"
            >
              {volunteerName ? (
                <>
                  <button
                    onClick={() => {
                      setVolunteer(id, null);
                      setVolunteerName(null);
                      setExpanded(false);
                    }}
                    className="outline outline-2 shadow-md rounded-md px-2 py-1.5 m-2"
                  >
                    i don&apos;t want to bring {name} anymore
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <input
                      value={volunteerInput}
                      onChange={(e) => setVolunteerInput(e.target.value)}
                      placeholder="enter your name here"
                      className="bg-background-primary py-1.5 px-2 outline outline-1 outline-black rounded-md text-black placeholder-black placeholder-opacity-40"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setVolunteer(id, volunteerInput);
                      setVolunteerName(volunteerInput);
                      setExpanded(false);
                    }}
                    className="outline outline-1 mt-4 shadow-md rounded-md px-2 py-1.5 m-2"
                  >
                    confirm
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Volunteer() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients().then((res) => setIngredients(res));
  }, []);

  return (
    <div className="static pt-3 md:pt-6 mx-3 md:mx-auto max-w-screen-md h-full">
      {ingredients.length > 0 &&
        ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ingredient.name}
            id={ingredient.id}
            name={ingredient.name}
            volunteer={ingredient.volunteer}
            color={ingredient.color}
            index={index}
          />
        ))}
    </div>
  );
}
