"use client";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

function DefaultBlock({ subtitle, text }) {
  const ref = useRef(null);
  const isVisible = useInView(ref, { amount: 0.5 });

  return (
    <div ref={ref} className="m-auto h-screen">
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ y: -50, opacity: "0%" }}
              animate={{
                y: 0,
                opacity: "100%",
                transition: {
                  delay: 0.5,
                  type: "spring",
                  duration: 1,
                  bounce: 0.6,
                },
              }}
              exit={{
                y: -50,
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              className="fixed w-screen left-0 top-[40vh] text-7xl m-auto text-center"
            >
              {subtitle}
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: "0%" }}
              animate={{ y: 0, opacity: "100%", transition: { delay: 0.5 } }}
              exit={{
                y: -50,
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              className="fixed w-screen left-0 top-1/2 text-5xl m-auto text-center"
            >
              {text}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  const moonPath = useTransform(easedProgress, [0, 1 / 6], ["50%", "100%"]);
  const batPath1 = useTransform(easedProgress, [1 / 6, 1 / 3], ["50%", "-50%"]);
  const batPath2 = useTransform(easedProgress, [1 / 3, 1 / 2], ["100%", "0%"]);
  const ghostPathX1 = useTransform(
    easedProgress,
    [1 / 2, 2 / 3],
    ["0vw", "50vw"]
  );
  const ghostPathY1 = useTransform(
    easedProgress,
    [1 / 2, 2 / 3],
    ["0vh", "-150vh"]
  );

  return (
    <>
      <motion.img
        src="./moon.png"
        style={{ offsetDistance: moonPath }}
        className="fixed w-20 h-20 md:w-36 md:h-36 moon"
      />
      <motion.img
        src="./bat-1.png"
        style={{ offsetDistance: batPath1 }}
        className="fixed w-20 h-20 md:w-36 md:h-36 bat-1"
      />
      <motion.img
        src="./bat-2.png"
        style={{ offsetDistance: batPath2 }}
        className="fixed w-20 h-20 md:w-36 md:h-36 bat-2"
      />
      <motion.img
        src="./ghost-1.png"
        style={{ x: ghostPathX1, y: ghostPathY1 }}
        className="fixed w-20 h-20 md:w-36 md:h-36 right-[100vw] top-[100vh]"
      />
      <div className="container m-auto h-full flex justify-center items-center">
        <motion.img
          initial={{ opacity: "0%" }}
          whileInView={{ opacity: "100%" }}
          transition={{ type: "spring", duration: 6 }}
          src="title.png"
          className="w-4/5 max-w-screen-md"
        />
      </div>
      <DefaultBlock subtitle={`when?`} text={`october 26, 8pm`} />
      <DefaultBlock subtitle={`where?`} text={`our house`} />
      <DefaultBlock subtitle={`who?`} text={`you`} />
      <DefaultBlock subtitle={`what?`} text={`halloween party`} />
      <DefaultBlock
        subtitle={`rules?`}
        text={`group costumes only or you will have to face the dice`}
      />
    </>
  );
}
