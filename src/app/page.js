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
                  delay: 0.3,
                  type: "spring",
                  duration: 1,
                  bounce: 0.6,
                },
              }}
              exit={{
                y: -50,
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              className="fixed w-screen left-0 top-[calc(50vh-3rem)] md:top-[calc(50vh-5rem)] text-5xl md:text-7xl m-auto text-center"
            >
              {subtitle}
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: "0%" }}
              animate={{ y: 0, opacity: "100%", transition: { delay: 0.3 } }}
              exit={{
                y: -50,
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              className="fixed w-screen left-0 top-1/2 text-2xl md:text-5xl m-auto text-center"
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

  const moonPath = useTransform(easedProgress, [0, 1 / 7], ["50%", "100%"]);
  const batPath1 = useTransform(easedProgress, [1 / 7, 2 / 7], ["30%", "-30%"]);
  const batPath2 = useTransform(easedProgress, [2 / 7, 3 / 7], ["80%", "40%"]);
  const ghostPathX1 = useTransform(
    easedProgress,
    [3 / 7, 4 / 7],
    ["calc(0vw)", "calc(50vw)"]
  );
  const ghostPathY1 = useTransform(
    easedProgress,
    [3 / 7, 4 / 7],
    ["calc(0vh + 0px)", "calc(-125vh - 230px)"]
  );
  const ghostPathX2 = useTransform(
    easedProgress,
    [4 / 7, 5 / 7],
    ["0vw", "-120vw"]
  );
  const ghostPathY2 = useTransform(
    easedProgress,
    [4 / 7, 5 / 7],
    ["calc(0vh - 180px)", "calc(-70vh - 180px)"]
  );
  const spiderPath = useTransform(
    easedProgress,
    [5 / 7, 11 / 14, 13 / 14, 1],
    ["0px", "420px", "420px", "0px"]
  );

  return (
    <>
      {/* animated elements */}
      <motion.img
        src="./moon.png"
        style={{ offsetDistance: moonPath }}
        className="fixed w-40 md:w-52 moon"
      />
      <motion.img
        src="./bat-1.png"
        style={{ offsetDistance: batPath1 }}
        className="fixed w-32 md:w-36 bat-1"
      />
      <motion.img
        src="./bat-2.png"
        style={{ offsetDistance: batPath2 }}
        className="fixed w-28 md:w-32 bat-2"
      />
      <motion.img
        src="./ghost-1.png"
        style={{ x: ghostPathX1, y: ghostPathY1 }}
        className="fixed w-44 md:w-52 left-0 top-[100vh]"
      />
      <motion.img
        src="./ghost-2.png"
        style={{ x: ghostPathX2, y: ghostPathY2 }}
        className="fixed w-56 md:w-64 left-[100vw] top-[70vh]"
      />
      <motion.img
        src="./spider.png"
        style={{ y: spiderPath }}
        className="fixed w-36  md:w-36  left-[60%] top-[-400px]"
      />
      {/* title image */}
      <div className="container m-auto h-full flex justify-center items-center">
        <motion.img
          initial={{ opacity: "0%" }}
          whileInView={{ opacity: "100%" }}
          transition={{ type: "spring", duration: 6 }}
          src="title.png"
          className="w-4/5 max-w-screen-md"
        />
      </div>
      {/* information blocks */}
      <DefaultBlock subtitle={`when?`} text={`october 26, 8pm`} />
      <DefaultBlock subtitle={`where?`} text={`our house`} />
      <DefaultBlock subtitle={`who?`} text={`you`} />
      <DefaultBlock subtitle={`what?`} text={`halloween party`} />
      <DefaultBlock
        subtitle={`rules?`}
        text={`group costumes only or you will have to face the dice`}
      />
      {/* poster image */}
      <div className="container m-auto h-full flex justify-center items-center">
        <motion.img
          initial={{ opacity: "0%" }}
          whileInView={{ opacity: "100%" }}
          transition={{ type: "spring", duration: 6 }}
          src="poster.png"
          className="max-h-[80vh]"
        />
      </div>
    </>
  );
}
