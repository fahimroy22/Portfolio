"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { smoothReveal, smoothItem } from "./motionPresets";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "UI/UX"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "MongoDB", "REST API", "Authentication"],
  },
  {
    title: "Programming",
    skills: ["JavaScript", "TypeScript", "C++", "Python", "Java"],
  },
  {
    title: "Professional",
    skills: [
      "Communication",
      "Fluent in English",
      "Leadership",
      "Problem Solving",
    ],
  },
];

const skillProjects: Record<string, string[]> = {
  React: ["PeerLearn", "E-Commerce System"],
  "Next.js": ["Portfolio Admin Panel", "Portfolio Website"],
  "Tailwind CSS": ["PeerLearn", "Portfolio Website"],
  TypeScript: ["Portfolio Website", "Portfolio Admin Panel"],
  "UI/UX": ["Portfolio Website", "PeerLearn"],

  "Node.js": ["PeerLearn", "E-Commerce System"],
  MongoDB: ["PeerLearn", "E-Commerce System"],
  "REST API": ["PeerLearn", "Portfolio Admin Panel"],
  Authentication: ["Portfolio Admin Panel", "E-Commerce System"],

  JavaScript: ["Portfolio Website", "PeerLearn"],
  "C++": ["Problem Solving", "Algorithm Practice"],
  Python: ["Automation Scripts", "Backend Fundamentals"],
  Java: ["OOP Projects", "Academic Projects"],

  Communication: ["Client Work", "Team Collaboration"],
  "Fluent in English": ["Client Communication", "Documentation"],
  Leadership: ["Team Projects", "Project Planning"],
  "Problem Solving": ["PeerLearn", "Algorithm Practice"],
};

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeIndex = skillGroups.findIndex(
    (group) => group.title === active.title
  );

  return (
    <section id="skills" className="relative px-6 py-28 pb-40 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={smoothReveal}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-300">
            Skills
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Tech Stack & Strengths
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            A balanced mix of technical skills, problem-solving ability, and
            communication skills for building real products.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={smoothItem(0)}
            viewport={{ once: true, amount: 0.18 }}
            className="glass rounded-[2rem] p-5"
          >
            <div className="relative grid gap-3">
              <motion.div
                className="absolute left-0 right-0 h-[84px] rounded-2xl bg-emerald-400 shadow-[0_18px_45px_rgba(52,211,153,0.25)]"
                animate={{ y: activeIndex * 96 }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
              />

              {skillGroups.map((group) => {
                const isActive = active.title === group.title;

                return (
                  <button
                    key={group.title}
                    onClick={() => {
                      setActive(group);
                      setHoveredSkill(null);
                    }}
                    className={`relative z-10 rounded-2xl px-5 py-4 text-left transition ${
                      isActive ? "text-slate-950" : "text-slate-300"
                    }`}
                  >
                    <p className="font-bold">{group.title}</p>
                    <p
                      className={`mt-1 text-sm ${
                        isActive ? "text-slate-800" : "text-slate-500"
                      }`}
                    >
                      {group.skills.length} skills
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={smoothItem(0.05)}
            className="group glass relative overflow-hidden rounded-[2rem] p-8 pb-10"
            onMouseMove={(e) => {
              if (window.innerWidth < 768) return;

              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--x",
                `${e.clientX - rect.left}px`
              );
              e.currentTarget.style.setProperty(
                "--y",
                `${e.clientY - rect.top}px`
              );
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 md:block"
              style={{
                background:
                  "radial-gradient(500px circle at var(--x) var(--y), rgba(16,185,129,0.13), transparent 40%)",
              }}
            />

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 xl:flex-row">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                  {active.title}
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  {active.title} Skills
                </h3>
              </div>

              <motion.div
                key={hoveredSkill || active.title}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={smoothItem(0)}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 xl:min-w-[280px]"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
                  Related Projects
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(hoveredSkill
                    ? skillProjects[hoveredSkill] || ["Portfolio Website"]
                    : ["Hover a skill"]
                  ).map((project) => (
                    <span
                      key={project}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="relative mt-8 grid gap-5 sm:grid-cols-2">
              {active.skills.map((skill, index) => (
                <TiltSkillCard
                  key={skill}
                  skill={skill}
                  index={index}
                  onHover={() => setHoveredSkill(skill)}
                  onLeave={() => setHoveredSkill(null)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TiltSkillCard({
  skill,
  index,
  onHover,
  onLeave,
}: {
  skill: string;
  index: number;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    x: 50,
    y: 50,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      rotateX: ((y - centerY) / centerY) * -7,
      rotateY: ((x - centerX) / centerX) * 7,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const reset = () => {
    setTilt({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
    onLeave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={smoothItem(index * 0.06)}
      onMouseMove={handleMove}
      onMouseEnter={onHover}
      onMouseLeave={reset}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-150 will-change-transform md:[transform-style:preserve-3d]"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover/card:opacity-100 md:block"
        style={{
          background: `radial-gradient(420px circle at ${tilt.x}% ${tilt.y}%, rgba(110,231,183,0.22), transparent 42%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 mix-blend-screen transition duration-300 group-hover/card:opacity-60 md:block"
        style={{
          background:
            "linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.18), transparent 45%)",
          transform: `translateX(${tilt.x - 50}%)`,
        }}
      />

      <div className="relative md:[transform:translateZ(28px)]">
        <p className="text-lg font-bold">{skill}</p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getSkillLevel(skill)}%` }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              delay: index * 0.08,
            }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
          />
        </div>

        <p className="mt-3 text-sm text-slate-400">{getSkillLabel(skill)}</p>

        <div className="mt-4 flex flex-wrap gap-2 opacity-100 transition duration-300 md:opacity-0 md:group-hover/card:opacity-100">
          {(skillProjects[skill] || ["Portfolio Website"]).map((project) => (
            <span
              key={project}
              className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[11px] text-emerald-200"
            >
              {project}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition group-hover/card:border-emerald-300/40" />
    </motion.div>
  );
}

function getSkillLevel(skill: string) {
  const levels: Record<string, number> = {
    React: 82,
    "Next.js": 80,
    "Tailwind CSS": 88,
    TypeScript: 75,
    "UI/UX": 78,
    "Node.js": 76,
    MongoDB: 74,
    "REST API": 80,
    Authentication: 70,
    JavaScript: 86,
    "C++": 78,
    Python: 75,
    Java: 72,
    Communication: 88,
    "Fluent in English": 90,
    Leadership: 82,
    "Problem Solving": 86,
  };

  return levels[skill] || 75;
}

function getSkillLabel(skill: string) {
  const labels: Record<string, string> = {
    Communication: "Clear collaboration and client communication",
    "Fluent in English": "Comfortable with professional communication",
    Leadership: "Able to guide teams and take responsibility",
    "Problem Solving": "Strong logical and analytical thinking",
    "C++": "Core programming and problem solving",
    Python: "Scripting, logic, and backend fundamentals",
    Java: "OOP and structured programming",
  };

  return labels[skill] || "Used in modern web application development";
}