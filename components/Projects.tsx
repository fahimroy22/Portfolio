"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "PeerLearn",
    slug: "peerlearn",
    type: "Learning Platform",
    image: "/profile.jpg",
    description:
      "A peer-to-peer learning platform where students collaborate, share resources, and grow together.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    status: "Featured",
  },
  {
    title: "Portfolio Admin Panel",
    slug: "portfolio-admin",
    type: "Dashboard",
    image: "/profile.jpg",
    description:
      "Admin dashboard for managing projects, content, and client interactions.",
    tech: ["Next.js", "Tailwind", "Auth", "Cloudinary"],
    status: "Planned",
  },
  {
    title: "E-Commerce System",
    slug: "ecommerce-system",
    type: "Full-Stack App",
    image: "/profile.jpg",
    description:
      "Shopping platform with cart, checkout, and admin control features.",
    tech: ["React", "Express", "MongoDB", "Stripe"],
    status: "Concept",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative px-5 py-24 text-white md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-emerald-300">
              Projects
            </p>

            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Real work. <br /> Real systems.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-slate-300">
            A curated selection of projects focused on performance, scalability,
            and clean UI systems.
          </p>
        </motion.div>

        <div className="grid gap-7 lg:grid-cols-3 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string;
    slug: string;
    type: string;
    image: string;
    description: string;
    tech: string[];
    status: string;
  };
  index: number;
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
      rotateX: ((y - centerY) / centerY) * -6,
      rotateY: ((x - centerX) / centerX) * 6,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const reset = () => {
    setTilt({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl transition duration-200 md:rounded-[28px] md:[transform-style:preserve-3d]"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition group-hover:opacity-100 md:block"
        style={{
          background: `radial-gradient(460px circle at ${tilt.x}% ${tilt.y}%, rgba(16,185,129,0.16), transparent 40%)`,
        }}
      />

      <div className="relative h-48 overflow-hidden md:h-56 md:[transform:translateZ(32px)]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105 md:group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-300">
          {project.status}
        </span>
      </div>

      <div className="p-5 md:p-6 md:[transform:translateZ(24px)]">
        <p className="text-sm text-emerald-300">{project.type}</p>

        <h3 className="mt-2 text-xl font-bold md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`/projects/${project.slug}`}
            className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-300"
          >
            Case Study
          </a>

          <a
            href={`/projects/${project.slug}/demo`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}