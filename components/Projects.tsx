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
    <section id="projects" className="relative px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-emerald-300">
              Projects
            </p>
            <h2 className="text-5xl font-black leading-tight">
              Real work. <br /> Real systems.
            </h2>
          </div>

          <p className="mt-6 max-w-md text-slate-300 md:mt-0">
            A curated selection of projects focused on performance, scalability,
            and clean UI systems.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: any) {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    x: 50,
    y: 50,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      rotateX: ((y - centerY) / centerY) * -8,
      rotateY: ((x - centerX) / centerX) * 8,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const reset = () => {
    setTilt({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
      viewport={{ once: true }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transformStyle: "preserve-3d",
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl transition duration-200"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${tilt.x}% ${tilt.y}%, rgba(16,185,129,0.18), transparent 40%)`,
        }}
      />

      {/* Shine */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition group-hover:opacity-60"
        style={{
          background:
            "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.2), transparent 45%)",
          transform: `translateX(${tilt.x - 50}%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-56 overflow-hidden" style={{ transform: "translateZ(40px)" }}>
        <img
          src={project.image}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-300">
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-6" style={{ transform: "translateZ(30px)" }}>
        <p className="text-sm text-emerald-300">{project.type}</p>
        <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>

        <p className="mt-3 text-sm text-slate-300">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={`/projects/${project.slug}`}
            className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-300"
          >
            Case Study
          </a>

          <a
            href={`/projects/${project.slug}/demo`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}