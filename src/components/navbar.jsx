"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNav(pageName) {
    router.push(pageName);
    setIsMenuOpen(false);
  }

  function NavItem({ path, index, children }) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: index >= 0 ? 0.3 + index * 0.1 : 0,
            type: "linear",
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="md:text-xl lg:text-2xl mx-1 p-1"
        onClick={() => handleNav(path)}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <div className="fixed top-3 left-3 right-3 z-50">
      <div className="flex flex-wrap p-2 rounded-md outline outline-black outline-2 bg-background-secondary">
        {/* mobile menu button */}
        <div className="flex-1 md:hidden max-w-12">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="h-full w-full"
          >
            <motion.svg
              initial={{ rotate: "0deg" }}
              animate={{
                rotate: isMenuOpen ? `90deg` : `0deg`,
                transition: {
                  type: "linear",
                  duration: 0.3,
                },
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-menu"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8l16 0" />
              <path d="M4 16l16 0" />
            </motion.svg>
          </button>
        </div>

        {/* website title */}
        <div className="flex-1 max-w-80 text-center md:text-left m-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                type: "linear",
                duration: 0.5,
              },
            }}
            className="font-normal max-[320px]:text-sm max-[350px]:text-base max-[400px]:text-lg max-sm:text-xl sm:text-2xl"
          >
            selinand&apos;s halloween 2024
          </motion.p>
        </div>

        {/* nav menu buttons */}
        <div className="flex-1 hidden md:block text-center md:text-right xl:text-center">
          <NavItem path="/">home</NavItem>
          <NavItem path="/cocktails">cocktails</NavItem>
          <NavItem path="/volunteer">volunteer</NavItem>
          <NavItem path="/costumes">costume ideas</NavItem>
        </div>

        {/* third menu spacer for xl */}
        <div className="hidden xl:block flex-1 max-w-80"></div>
        <div className="flex-1 md:hidden max-w-11" />
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: "auto",
              transition: {
                type: "linear",
                duration: 0.3,
              },
            }}
            exit={{
              height: 0,
              transition: {
                delay: 0.3,
                duration: 0.3,
              },
            }}
            className="flex left-3 right-3 mt-3 rounded-md outline outline-black outline-2 bg-background-secondary z-50"
          >
            <div className={`flex flex-col w-full text-center`}>
              <NavItem index={0} path="/">
                home
              </NavItem>
              <NavItem index={1} path="/cocktails">
                cocktails
              </NavItem>
              <NavItem index={2} path="/volunteer">
                volunteer
              </NavItem>
              <NavItem index={3} path="/costumes">
                costume ideas
              </NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
