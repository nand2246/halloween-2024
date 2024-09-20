"use client";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const partyData = [
  { subtitle: `what?`, text: `halloween party` },
  { subtitle: `when?`, text: `october 26, 7pm` },
  { subtitle: `where?`, text: `our house` },
  { subtitle: `who?`, text: `you` },
  {
    subtitle: `rules?`,
    text: `group costumes only`,
  },
];

function InfoText({ subtitle, text }) {
  const ref = useRef(null);
  const isVisible = useInView(ref, { amount: 0.5 });

  return (
    <div ref={ref} className="z-40 h-screen">
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
                  duration: 0.8,
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
              className="fixed w-screen top-[calc(50vh-3rem)] lg:top-[calc(50vh-5rem)] text-5xl lg:text-7xl text-center"
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
              className="fixed w-screen top-[50vh] text-2xl lg:text-5xl text-center"
            >
              {text}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function AllInfo() {
  const ref = useRef(null);
  const isVisible = useInView(ref, { amount: 0.8 });

  return (
    <>
      <div
        ref={ref}
        className="h-[calc(100svh-75px)] lg:h-[calc(100svh-100px)]"
      >
        <Image
          src="/title.png"
          alt="title image"
          width={0}
          height={0}
          sizes="100vw"
          className="max-h-[0vh] lg:max-h-[30vh] max-w-[90vw] m-auto"
        />
        <div className="flex flex-col h-[65%] mb-[35%]">
          <div className="flex-1 text-center">
            <h1 className="text-5xl lg:text-6xl font-medium">details:</h1>
          </div>
          {partyData.map((data) => (
            <div key={data.subtitle} className="flex-1 text-center">
              <h2 className="text-2xl lg:text-4xl font-light">
                {data.subtitle}
              </h2>
              <h3 className="text-xl lg:text-2xl">{data.text}</h3>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 800 }}
            animate={{
              y: 0,
              transition: {
                type: "spring",
                duration: 0.8,
                bounce: 0.4,
              },
            }}
            exit={{
              y: 800,
              transition: {
                duration: 0.8,
              },
            }}
            className="fixed w-full bottom-0"
          >
            <Image
              src="/bunny.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="fixed bottom-0 right-[10vw] lg:right-1 w-[25vw] z-40"
            />
            <Image
              src="/cat.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="fixed bottom-0 left-[5vw] lg:left-1 w-[33vw] z-40"
            />
            <Image
              src="/gourd.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="fixed bottom-0 right-1 lg:left-[25vw] w-[20vw] lg:w-[15vw] z-30"
            />
            <Image
              src="/pumpkin.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="fixed bottom-0 left-1 lg:left-6 w-[20vw] lg:w-[15vw] z-30"
            />
            <Image
              src="/skull.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="fixed bottom-0 left-1/2 lg:left-[72vw] w-[8vw] z-20"
            />
            <Image
              src="/tombstone.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="fixed bottom-0 mx-auto inset-x-0 lg:left-[40vw] w-[20vw]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  const animatedImages = [
    {
      classes: "w-40 lg:w-52 moon",
      src: "moon.png",
      animate: {
        offsetDistance: useTransform(
          easedProgress,
          [0, 1 / 7],
          ["50%", "100%"]
        ),
      },
    },
    {
      src: "bat-1.png",
      classes: "w-32 lg:w-36 bat-1",
      animate: {
        offsetDistance: useTransform(
          easedProgress,
          [1 / 7, 2 / 7],
          ["30%", "-30%"]
        ),
      },
    },
    {
      src: "bat-2.png",
      classes: "w-28 lg:w-32 bat-2",
      animate: {
        offsetDistance: useTransform(
          easedProgress,
          [2 / 7, 3 / 7],
          ["80%", "40%"]
        ),
      },
    },
    {
      src: "ghost-1.png",
      classes: "w-44 lg:w-52 left-0 top-[120vh]",
      animate: {
        x: useTransform(easedProgress, [3 / 7, 4 / 7], ["0vw", "50vw"]),
        y: useTransform(
          easedProgress,
          [3 / 7, 4 / 7],
          ["calc(0vh + 0px)", "calc(-120vh - 230px)"]
        ),
      },
    },
    {
      src: "ghost-2.png",
      classes: "w-56 lg:w-64 left-[100vw] top-[70vh]",
      animate: {
        x: useTransform(easedProgress, [4 / 7, 5 / 7], ["0vw", "-100vw"]),
        y: useTransform(
          easedProgress,
          [4 / 7, 5 / 7],
          ["calc(0vh - 180px)", "calc(-70vh - 180px)"]
        ),
      },
    },
    {
      src: "spider.png",
      classes: "w-28  lg:w-36  left-[60%] top-[-370px]",
      animate: {
        y: useTransform(
          easedProgress,
          [5 / 7, 11 / 14, 13 / 14, 1],
          ["0px", "360px", "360px", "0px"]
        ),
      },
    },
  ];

  return (
    <>
      {/* animated elements */}
      {animatedImages.map((image) => (
        <motion.img
          key={image.src}
          src={image.src}
          style={image.animate}
          className={`fixed ${image.classes}`}
        />
      ))}

      {/* title image */}
      <div className="h-[calc(100vh-74px)] flex justify-center items-center">
        <motion.img
          initial={{ opacity: "0%" }}
          whileInView={{ opacity: "100%" }}
          transition={{ type: "linear", duration: 4 }}
          src="title.png"
          className="w-[90%] max-w-screen-md"
        />
      </div>

      {/* information blocks */}
      {partyData.map((data) => (
        <InfoText
          key={data.subtitle}
          subtitle={data.subtitle}
          text={data.text}
        />
      ))}
      <AllInfo />
    </>
  );
}
