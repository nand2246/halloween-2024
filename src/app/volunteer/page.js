"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  fetchClaimedIngredients,
  fetchUnclaimedIngredients,
  setVolunteer,
} from "./actions";

function ClaimedIngredientCard({
  id,
  name,
  volunteer,
  color,
  index,
  handleUnclaim,
}) {
  const [expanded, setExpanded] = useState(false);
  const [claimed, setClaimed] = useState(true);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 * index } }}
        exit={{ opacity: 0 }}
        className={`w-full mb-8 p-4 outline outline-2 rounded-md text-center`}
        style={{
          backgroundColor: color,
        }}
      >
        {/* sign up information/button */}
        <AnimatePresence>
          {claimed && (
            <motion.div
              initial={{ height: "auto" }}
              exit={{
                height: 0,
                transition: { delay: 0.3, duration: 0.5 },
              }}
            >
              <motion.div
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="text-center text-4xl sm:text-5xl py-8 font-normal">
                  {name}
                </div>
                <h2 className="mb-4">
                  {volunteer} is bringing {name}
                </h2>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="outline outline-2 rounded-md px-2 py-1.5 m-2"
                >
                  i am {volunteer}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* post unclaim text */}
        {!claimed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: "auto",
              transition: { type: "linear", delay: 1, duration: 0.5 },
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { type: "linear", delay: 1.5, duration: 0.3 },
              }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl py-8 font-normal">
                you unclaimed {name}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* expanded section */}
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
                <button
                  onClick={() => {
                    setVolunteer(id, null);
                    setExpanded(false);
                    setClaimed(false);
                    handleUnclaim();
                  }}
                  className="outline outline-2 shadow-md rounded-md px-2 py-1.5 m-2"
                >
                  i don&apos;t want to bring {name} anymore
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function UnclaimedIngredientCard({ id, name, color, index, handleClaim }) {
  const [expanded, setExpanded] = useState(false);
  const [volunteerInput, setVolunteerInput] = useState("");
  const [claimed, setClaimed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1 * index } }}
    >
      <div
        className={`w-full mb-8 p-4 outline outline-2 rounded-md text-center`}
        style={{
          backgroundColor: color,
        }}
      >
        {/* sign up information/button */}
        <AnimatePresence>
          {!claimed && (
            <motion.div
              initial={{ height: "auto" }}
              exit={{
                height: 0,
                transition: { delay: 0.3, duration: 0.5 },
              }}
            >
              <motion.div
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0, duration: 0.3 },
                }}
              >
                <div className="text-center text-4xl sm:text-5xl py-8 font-normal">
                  {name}
                </div>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="outline outline-2 rounded-md px-2 py-1.5 m-2"
                >
                  i want to bring this
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* post-sign-up text */}
        {claimed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: "auto",
              transition: { type: "linear", delay: 1, duration: 0.5 },
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { type: "linear", delay: 1.5, duration: 0.3 },
              }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl pt-6 pb-4 font-normal">
                you signed-up to bring {name}
              </div>
              <div className="text-lg sm:text-2xl p-4">
                {`(you can unclaim this ingredient if you scroll down)`}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* expanded section */}
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
                    handleClaim();
                    setVolunteer(id, volunteerInput);
                    setExpanded(false);
                    setClaimed(true);
                  }}
                  className="outline outline-1 mt-4 shadow-md rounded-md px-2 py-1.5 m-2"
                >
                  confirm
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Volunteer() {
  const [updateClaimedList, setUpdateClaimedList] = useState(0);
  const [updateUnclaimedList, setUpdateUnclaimedList] = useState(0);
  const [unclaimedIngredients, setUnclaimedIngredients] = useState();
  const [claimedIngredients, setClaimedIngredients] = useState();

  useEffect(() => {
    fetchUnclaimedIngredients().then((res) => setUnclaimedIngredients(res));
  }, [updateUnclaimedList]);

  useEffect(() => {
    fetchClaimedIngredients().then((res) => setClaimedIngredients(res));
  }, [updateClaimedList]);

  return (
    <div className="static pt-3 md:pt-6 mx-3 md:mx-auto max-w-screen-md">
      {unclaimedIngredients && (
        <>
          <h1 className="w-full text-center mb-10 text-5xl font-bold">
            unclaimed:
          </h1>
          {unclaimedIngredients.length > 0 ? (
            unclaimedIngredients.map((ingredient, index) => (
              <UnclaimedIngredientCard
                key={ingredient.name}
                id={ingredient.id}
                name={ingredient.name}
                color={ingredient.color}
                index={index + 1}
                handleClaim={() => setUpdateClaimedList(updateClaimedList + 1)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1 } }}
              className={`w-full mb-8 p-4 outline outline-2 rounded-md text-center`}
            >
              <div className="text-center text-4xl sm:text-5xl my-8 font-normal">
                {`everything has been claimed :)`}
              </div>
            </motion.div>
          )}
        </>
      )}

      {claimedIngredients && (
        <>
          <h1 className="w-full text-center mb-10 text-5xl font-bold">
            claimed:
          </h1>
          {claimedIngredients.length > 0 ? (
            claimedIngredients.map((ingredient, index) => (
              <ClaimedIngredientCard
                key={ingredient.name}
                id={ingredient.id}
                name={ingredient.name}
                volunteer={ingredient.volunteer}
                color={ingredient.color}
                index={index + 1}
                handleUnclaim={() =>
                  setUpdateUnclaimedList(updateUnclaimedList + 1)
                }
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1 } }}
              className={`w-full mb-8 p-4 outline outline-2 rounded-md text-center`}
            >
              <div className="text-center text-4xl sm:text-5xl my-8 font-normal">
                {`nothing has been claimed :(`}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
