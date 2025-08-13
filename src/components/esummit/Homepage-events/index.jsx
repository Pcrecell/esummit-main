"use client";

//PS: whenever required - uncomment the evnets and the arrow keys 

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const questionMark = "/images/esummit/dashboard/Question-Mark.svg";

const events = [
  {
    id: "1",
    title: "Almost Here",
    date: "",
    desc: "Dont Blink!",
    image: questionMark,

  },
  // {
  //   id: "2",
  //   title: "ALICE IN FOUNDERLAND",
  //   date: "AUG 23",
  //   desc: "Welcome to Alice in Founderland, a thrilling entrepreneurial adventure inspired by the hit series Alice in Borderland. In this high-stakes event, participants must navigate through a challenging game, where each level unravels a complex real-world problem demanding smart, scalable solutions.Participants are not just solving problems — they're playing to win. Every challenge is designed to test your creativity, critical thinking, and entrepreneurial instincts. The deeper you go, the tougher it gets. But only those who crack the code and present the most impactful ideas will emerge victorious.",
  //   image: questionMark,
  // },
  // {
  //   id: "3",
  //   title: "CASE BATTLE",
  //   date: "AUG 24",
  //   desc: "Case Battle is the ultimate battleground for problem solvers, strategists, and future leaders. In this intense event, participants are presented with real-world case studies across diverse domains — from business and tech to social impact and governance.Teams must analyze the case, devise practical solutions, and battle it out through presentations that are judged on innovation, feasibility, and clarity. It's not just about having an idea — it's about proving it can withstand the heat of competition.",
  //   image: questionMark,
  // },
  // {
  //   id: "4",
  //   title: "PANDORAS PARADOX",
  //   date: "AUG 22",
  //   desc: "Inspired by the mythical tale of Pandora's Box, Pandora's Paradox is a gripping ideation challenge where each problem statement is a 'bad soul' unleashed into the world — from climate crises and misinformation to ethical dilemmas in tech.But just like the myth, hope remains. It's up to the participants to transform chaos into solutions — the 'good souls'. With every round, teams confront darker and more complex challenges, pushing them to think critically, ethically, and creatively.",
  //   image: questionMark,
  // },
  // {
  //   id: "5",
  //   title: "EXPO",
  //   date: "AUG 23",
  //   desc: "EXPO is a dynamic showcase of ideas, innovations, and initiatives — a platform where creators, problem solvers, and visionaries come together to exhibit their work and inspire change.From startups and tech demos to social innovations and research models, EXPO brings a diverse range of projects under one roof. It's not just about displaying; it's about connecting, collaborating, and sparking conversations that matter.",
  //   image: questionMark,
  // },
];

export const Event = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100 && current < events.length - 1) {
      setCurrent(current + 1);
    } else if (info.offset.x > 100 && current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div
      className="w-full bg-cover bg-center flex items-center justify-center relative lg:translate-y-40"
      style={{
        backgroundImage: `url('https://i.postimg.cc/tR5Gf4xW/image-2.png')`,
        minHeight: "110vh",
        backgroundSize: "cover",
        backgroundPosition: "calc(50% + 30px) center",

      }}
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-5"></div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-5"></div>

      <div className="relative w-full max-w-6xl px-4">
        {/* <button
          onClick={prev}
          className="absolute left-4 md:-left-8 md:top-1/2 top-[35%] -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
        >
          <ChevronLeft size={32} />
        </button> */}

        {/* Fixed Right Arrow */}


        {/* <button
          onClick={next}
          className="absolute right-4 md:-right-8 md:top-1/2 top-[35%] -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
        >
          <ChevronRight size={32} />
        </button> */}
        <AnimatePresence mode="wait">
          <motion.div
            key={events[current].id}
            className="relative w-full flex flex-col md:flex-row items-center justify-between gap-8 md:-mt-40 z-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            // drag="x"
            // dragConstraints={{ left: 0, right: 0 }}
            // onDragEnd={handleDragEnd}
          >
            {/* Left Text */}
            <div className="text-white w-full md:w-1/3 flex flex-col items-center justify-center ">
              {/* <h2
                className="text-4xl md:text-5xl font-bold font-texturina mb-2 text-center md:-mt-48"
                style={{
                  background:
                    "linear-gradient(180deg, #00FF3B 50%, #FFFFFF 50%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {events[current].title}
              </h2> */}

              <h2
                className="text-4xl md:text-7xl md:mt-10 font-bold font-texturina mb-2 text-center"
                style={{
                  background:
                    "linear-gradient(180deg, #00FF3B 50%, #FFFFFF 50%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {events[current].title}
              </h2>
              <p className="text-lg opacity-80 font-texturina text-center">
                {events[current].date}
              </p>
            </div>

            {/* Centered Image */}
            <div className="w-full md:w-1/3 flex  justify-center h-[500px] md:h-[600px] relative ">
              <img
                src={events[current].image}
                alt={events[current].title}
                className="max-h-full max-w-full object-contain md:-ml-12"
              />
            </div>

            {/* Right Description */}
            <div className="text-white w-full md:w-1/3 flex flex-col items-center ">
              {/* <h2
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: "Teko, sans-serif" }}
              >
                About Event
              </h2> */}
              {/* <p
                className="text-lg opacity-90 text-center tracking-widest"
                style={{ fontFamily: "Teko, sans-serif" }}
              >
                {events[current].desc}
              </p> */}
              <p
                className="text-xl md:text-7xl opacity-90 text-center tracking-widest"
                style={{ fontFamily: "Teko, sans-serif" }}
              >
                {events[current].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
