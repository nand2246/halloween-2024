"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  addCustomIngredient,
  deleteCustomIngredient,
  fetchClaimedIngredients,
  fetchUnclaimedIngredients,
  setVolunteer,
} from "./actions";

function ClaimedIngredientCard({ ingredient, handleUnclaim }) {
  const { id, name, amount, link, volunteer, color, whiteText } = ingredient;
  const [expanded, setExpanded] = useState(false);
  const [claimed, setClaimed] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full mb-8 p-4 outline outline-2 rounded-md text-center`}
      style={{
        backgroundColor: color ? color : "#BAAF98",
        color: whiteText ? "white" : "inherit",
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
              <div className="text-center text-4xl sm:text-5xl pt-8 font-normal">
                {name}
              </div>
              <h2 className="mb-4 pt-4">
                {volunteer} is bringing {name}
              </h2>
              {amount && (
                <div className="text-center text-base sm:text-2xl pt-1">
                  <span className="font-light">amount:</span> {amount}
                </div>
              )}
              {link && (
                <div className="text-center text-base sm:text-2xl pt-1 pb-6">
                  <a href={link} target="_blank" className="font-light">
                    click here
                  </a>{" "}
                  to see an example
                </div>
              )}
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
                  amount && link
                    ? setVolunteer(id, null)
                    : deleteCustomIngredient(id);
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
  );
}

function UnclaimedIngredientCard({ ingredient, handleClaim }) {
  const { id, name, amount, link, color, whiteText } = ingredient;
  const [expanded, setExpanded] = useState(false);
  const [volunteerInput, setVolunteerInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [claimed, setClaimed] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        className="w-full mb-8 p-4 outline outline-2 rounded-md text-center"
        style={{
          backgroundColor: color,
          color: whiteText ? "white" : "inherit",
        }}
      >
        {/* sign up information/button */}
        <AnimatePresence>
          {!claimed && (
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: "auto",
                transition: { delay: 1, duration: 0.5 },
              }}
              exit={{
                height: 0,
                transition: { delay: 0.3, duration: 0.5 },
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1.5, duration: 0.3 },
                }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0, duration: 0.3 },
                }}
              >
                <div className="text-center text-4xl sm:text-5xl pt-8 font-normal">
                  {name}
                </div>
                {amount && (
                  <div className="text-center text-base sm:text-2xl pt-4">
                    <span className="font-light">amount:</span> {amount}
                  </div>
                )}
                {link && (
                  <div className="text-center text-base sm:text-2xl pt-1">
                    <a href={link} target="_blank" className="font-light">
                      click here
                    </a>{" "}
                    to see an example
                  </div>
                )}
                {!id && (
                  <div className="text-center text-base sm:text-2xl pt-3">
                    drinks, snacks, and anything else you can think of...
                  </div>
                )}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="outline outline-2 rounded-md text-lg sm:text-2xl px-2 py-1.5 m-2 mt-8"
                >
                  i want to bring this
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* post-sign-up text */}
        <AnimatePresence>
          {claimed && (
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: "auto",
                transition: { type: "linear", delay: 1, duration: 0.5 },
              }}
              exit={{ height: 0, transition: { delay: 0.3, duration: 0.5 } }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { type: "linear", delay: 1.5, duration: 0.3 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl pt-6 pb-4 font-normal">
                  you signed-up to bring {id ? name : "something else"}
                </div>
                <div className="text-lg sm:text-2xl p-4">
                  {`(you can unclaim this ingredient if you scroll down)`}
                </div>
                {!id && (
                  <button
                    onClick={() => setClaimed(false)}
                    className="outline outline-2 outline-black rounded-md text-lg sm:text-2xl py-1.5 px-2 mt-3"
                  >
                    i want to bring another item
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                className="pt-4 sm:pt-6"
              >
                <div>
                  <input
                    value={volunteerInput}
                    onChange={(e) => setVolunteerInput(e.target.value)}
                    placeholder="enter your name here"
                    className={`bg-transparent py-1.5 px-2 outline outline-1 outline-black rounded-md text-lg sm:text-2xl text-black placeholder-opacity-30 ${
                      whiteText ? "placeholder-white" : "placeholder-black"
                    }`}
                    style={{
                      outlineColor: whiteText ? "white" : "inherit",
                      color: whiteText ? "white" : "inherit",
                    }}
                  />
                </div>
                {!id && (
                  <div>
                    <input
                      value={ingredientInput}
                      onChange={(e) => setIngredientInput(e.target.value)}
                      placeholder="what are you bringing?"
                      className={`bg-transparent py-1.5 px-2 outline outline-1 outline-black rounded-md mt-4 text-lg sm:text-2xl text-black placeholder-opacity-30 ${
                        whiteText ? "placeholder-white" : "placeholder-black"
                      }`}
                      style={{
                        outlineColor: whiteText ? "white" : "inherit",
                        color: whiteText ? "white" : "inherit",
                      }}
                    />
                  </div>
                )}
                <button
                  onClick={() => {
                    handleClaim();
                    if (!id)
                      addCustomIngredient(volunteerInput, ingredientInput);
                    if (id) setVolunteer(id, volunteerInput);
                    setVolunteerInput("");
                    setIngredientInput("");
                    setExpanded(false);
                    setClaimed(true);
                  }}
                  className="outline outline-1 mt-4 shadow-md rounded-md text-lg sm:text-2xl px-2 py-1.5 m-2"
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
      <AnimatePresence>
        {!unclaimedIngredients && !claimedIngredients && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { delay: 1.2, duration: 0.3 } }}
          >
            <p className="w-full text-center text-5xl font-bold pt-3">
              loading...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {unclaimedIngredients || claimedIngredients ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.3 } }}
        >
          {unclaimedIngredients && (
            <>
              <h1 className="w-full text-center mb-10 text-5xl font-bold pt-3">
                unclaimed:
              </h1>
              {unclaimedIngredients.length > 0 ? (
                unclaimedIngredients.map((ingredient, index) => (
                  <UnclaimedIngredientCard
                    key={ingredient.id}
                    ingredient={ingredient}
                    index={index + 1}
                    handleClaim={() =>
                      setUpdateClaimedList(updateClaimedList + 1)
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
                    {`everything has been claimed :)`}
                  </div>
                </motion.div>
              )}
            </>
          )}
          <UnclaimedIngredientCard
            ingredient={{
              name: "i want to bring something else",
              color: "#BAAF98",
            }}
            index={0}
            handleClaim={() => setUpdateClaimedList(updateClaimedList + 1)}
          />
          {claimedIngredients && (
            <>
              <h1 className="w-full text-center mb-10 text-5xl font-bold">
                claimed:
              </h1>
              {claimedIngredients.length > 0 ? (
                claimedIngredients.map((ingredient, index) => (
                  <ClaimedIngredientCard
                    key={ingredient.id}
                    ingredient={ingredient}
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
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
}
