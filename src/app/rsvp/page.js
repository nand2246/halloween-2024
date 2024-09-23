"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { submitRSVP } from "./actions";

export default function RSVP() {
  const [showForm, setShowForm] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function RSVPModal() {
    return (
      <>
        {showForm && (
          <motion.div
            key="test"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.2,
              },
            }}
            className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-30 bg-black z-50"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.2,
                },
              }}
              className="relative text-center bg-background-primary px-6 py-3 max-w-[90%] outline outline-2 rounded-md"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: isFormSubmitted ? 0 : 0.8 },
                }}
                className="absolute right-3 top-3"
                onClick={() => {
                  setShowForm(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-x h-full"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </motion.div>
              {!isFormSubmitted && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: "auto",
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); //  stop the container onclick (closing form)s
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.8 } }}
                  >
                    <div className="text-4xl font-medium py-4">rsvp form</div>
                    <form
                      action={(formData) => {
                        submitRSVP(formData);
                        setIsFormSubmitted(true);
                      }}
                    >
                      <div className="py-4">
                        <label for="name" className="text-3xl">
                          name:
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-background-primary py-1.5 px-2 outline outline-1 outline-black rounded-md text-black w-full"
                        />
                      </div>
                      <div className="py-4">
                        <label for="email" className="text-3xl my-40">
                          email:
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-background-primary py-1.5 px-2 outline outline-1 outline-black rounded-md text-black w-full"
                        />
                      </div>
                      <input
                        type="submit"
                        value="submit"
                        className="outline outline-1 mt-4 shadow-md rounded-md px-2 py-1.5 m-2"
                      />
                    </form>
                  </motion.div>
                </motion.div>
              )}
              {isFormSubmitted && (
                <div className="py-10 px-5">you have successfully rsvp'd</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </>
    );
  }

  useEffect(() => {
    if (showForm) {
      if (document.body.clientWidth < window.innerWidth) {
        document.body.style.paddingRight = `${
          window.innerWidth - document.body.clientWidth
        }px`;
      }
      console.log(document.body.clientWidth);
      console.log(window.innerWidth);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = `${0}px`;
    }
  }, [showForm]);

  return (
    <motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.6,
            duration: 0.5,
          },
        }}
        className="static pt-3 md:pt-6 mx-3 md:mx-auto max-w-screen-md text-center"
      >
        <div>
          <p className="w-full p-3 text-5xl font-bold">
            final info before you rsvp
          </p>
        </div>
        <div className="text-3xl font-normal pt-10 pb-3">party rules</div>
        <div>
          group or couples costumes only... or face
          <strong className="font-extrabold text-3xl tracking-widest">
            {" "}
            the die
          </strong>
        </div>
        <div>→ roll a die to see how many shots you take</div>
        <div className="text-3xl font-normal pt-10 pb-3">
          don&apos;t know what to wear?
        </div>
        <div>
          If you need ideas, check out our{" "}
          <a href="/costumes" className="font-light">
            costume generator
          </a>
        </div>
        <div className="text-3xl font-normal pt-10 pb">rsvp :)</div>
        <div className="pb-5">note: plus ones must also fill out the form</div>
        <button
          className="outline outline-2 outline-black rounded-md p-2"
          onClick={() => setShowForm(true)}
        >
          click here to rsvp
        </button>
        <div className="text-3xl font-normal pt-10 pb-3">additional info</div>
        <div>
          check out our cocktail page for drinks info and{" "}
          <strong>please</strong> sign up for an ingredient to bring (or more)
        </div>
        <div className="text-3xl font-normal pt-10 pb-3">party playlist:</div>
        <div>
          <iframe
            className="rounded-md"
            src="https://open.spotify.com/embed/playlist/5ob742h1Sj3j78LzKf6tlr?utm_source=generator&theme=0"
            width="100%"
            height="352"
          ></iframe>
        </div>
      </motion.div>
      <RSVPModal />
    </motion.div>
  );
}
