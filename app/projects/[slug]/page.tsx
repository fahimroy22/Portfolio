"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const caseStudies = {
  peerlearn: {
    title: "PeerLearn",
    type: "Learning Platform",
    description:
      "A peer-to-peer learning platform where students share resources, collaborate, and learn together.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    role: "Full-Stack Developer",
    focus: "Student Collaboration",
    goal: "Build a scalable learning platform",
    problem:
      "Students often struggle to find organized academic resources, reliable peer support, and structured collaboration outside the classroom.",
    solution:
      "PeerLearn creates a focused learning environment where students can post resources, join learning groups, ask questions, and interact with peers.",
    outcome:
      "A structured product concept that demonstrates learning flows, collaboration systems, and full-stack product thinking.",
    features: [
      "Student profiles",
      "Resource sharing",
      "Peer discussion flow",
      "Admin moderation",
      "Responsive dashboard UI",
      "Scalable backend structure",
    ],
  },
  "portfolio-admin": {
    title: "Portfolio Admin Panel",
    type: "Dashboard",
    description:
      "A dashboard concept for uploading projects, managing portfolio content, and handling client messages.",
    tech: ["Next.js", "Tailwind", "Auth", "Cloudinary"],
    role: "Frontend / Dashboard Developer",
    focus: "Content Management",
    goal: "Make portfolio updates easy",
    problem:
      "Manually editing portfolio code every time a project changes is slow and not client-friendly.",
    solution:
      "The admin panel allows project uploads, content editing, and client message management from one dashboard.",
    outcome:
      "A flexible admin experience that makes updating projects and handling client communication faster and cleaner.",
    features: [
      "Project upload system",
      "Image management",
      "Authentication",
      "Client messages",
      "Dashboard analytics",
      "Content editing",
    ],
  },
  "ecommerce-system": {
    title: "E-Commerce System",
    type: "Full-Stack App",
    description:
      "A shopping platform concept with cart, checkout, product management, and admin controls.",
    tech: ["React", "Express", "MongoDB", "Stripe"],
    role: "Full-Stack Developer",
    focus: "Online Shopping Flow",
    goal: "Build a scalable commerce experience",
    problem:
      "Small businesses need clean, responsive shopping platforms that are easy to manage.",
    solution:
      "This system provides product browsing, cart flow, checkout, and admin product controls.",
    outcome:
      "A scalable commerce concept with a clean customer journey and admin-first product management flow.",
    features: [
      "Product listing",
      "Shopping cart",
      "Checkout flow",
      "Admin product control",
      "Responsive UI",
      "Payment integration concept",
    ],
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as keyof typeof caseStudies;
  const project = caseStudies[slug];

  const isMobile = useIsMobile();

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.4,
  });

  const heroY = useTransform(heroProgress, [0, 1], isMobile ? [0, 32] : [0, 150]);
  const heroScale = useTransform(heroProgress, [0, 1], isMobile ? [1, 0.98] : [1, 0.9]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], isMobile ? [1, 0.6] : [1, 0.28]);

  const visualY = useTransform(storyProgress, [0, 1], isMobile ? [16, -16] : [80, -90]);
  const visualRotate = useTransform(storyProgress, [0, 1], isMobile ? [0, 0] : [-2, 2]);
  const glowY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -60] : [0, -320]);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-white">
        <div className="glass rounded-3xl p-10 text-center">
          <h1 className="text-4xl font-black">Project not found</h1>
          <Link href="/" className="mt-6 inline-block text-emerald-300">
            ← Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden px-6 py-28 text-white"
    >
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400"
      />

      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none fixed left-[-12%] top-[15%] h-[280px] w-[280px] rounded-full bg-emerald-400/10 blur-2xl md:h-[520px] md:w-[520px] md:blur-3xl"
      />

      <motion.div
        style={{ y: visualY }}
        className="pointer-events-none fixed right-[-12%] top-[35%] h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-2xl md:h-[560px] md:w-[560px] md:blur-3xl"
      />

      <section className="relative mx-auto max-w-7xl">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Link
            href="/"
            className="mb-8 inline-block text-sm text-emerald-300 transition hover:text-emerald-200"
          >
            ← Back to Portfolio
          </Link>
        </motion.div>

        <motion.section
          ref={heroRef}
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative min-h-[68vh] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-7 backdrop-blur-xl sm:p-10 md:min-h-[72vh] md:rounded-[2.7rem] md:p-16"
        >
          <motion.div
            animate={isMobile ? {} : { x: [0, 44, -32, 0], y: [0, -28, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-6 top-6 h-48 w-48 rounded-full bg-emerald-400/20 blur-2xl md:left-10 md:top-10 md:h-72 md:w-72 md:blur-3xl"
          />

          <motion.div
            animate={isMobile ? {} : { x: [0, -28, 34, 0], y: [0, 32, -22, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-500/20 blur-2xl md:h-96 md:w-96 md:blur-3xl"
          />

          <div className="relative flex min-h-[50vh] flex-col justify-center md:min-h-[56vh]">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-emerald-300 md:tracking-[0.4em]">
              Case Study / {project.type}
            </p>

            <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-8xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:mt-8">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 md:mt-9">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4 md:mt-10">
              <Link
                href={`/projects/${slug}/demo`}
                className="premium-button rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-300"
              >
                Open Live Preview →
              </Link>

              <a
                href="#story"
                className="premium-button rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                Read Case Study
              </a>
            </div>
          </div>
        </motion.section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <InfoCard label="Role" value={project.role} />
          <InfoCard label="Focus" value={project.focus} />
          <InfoCard label="Goal" value={project.goal} />
        </section>

        <section
          ref={storyRef}
          id="story"
          className="mt-24 grid gap-12 lg:mt-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div className="lg:sticky lg:top-28">
            <motion.div
              style={{ y: visualY, rotate: visualRotate }}
              className="glass relative overflow-hidden rounded-[2rem] p-5 md:rounded-[2.4rem] md:p-7"
            >
              <div className="relative h-[420px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-emerald-500/20 via-slate-950 to-blue-500/20 sm:h-[520px] md:h-[560px] md:rounded-[1.8rem]">
                <motion.div
                  animate={isMobile ? {} : { y: [0, -18, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-7 top-7 h-20 w-40 rounded-3xl border border-white/10 bg-white/10 md:h-24 md:w-48"
                />

                <motion.div
                  animate={isMobile ? {} : { y: [0, 20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-7 top-16 h-36 w-32 rounded-3xl border border-emerald-300/20 bg-emerald-400/20 md:h-44 md:w-40"
                />

                <motion.div
                  animate={isMobile ? {} : { y: [0, -14, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-1/2 h-44 w-[78%] -translate-x-1/2 rounded-[2rem] border border-white/10 bg-white/10 md:h-56"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-300 md:tracking-[0.4em]">
                    Product System
                  </p>

                  <h2 className="mt-4 max-w-md text-3xl font-black leading-tight md:text-4xl">
                    Scroll-driven product thinking
                  </h2>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                    Problem, solution, architecture, and product value presented
                    as a guided story.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <StoryBlock eyebrow="01 / Problem" title="The challenge" text={project.problem} />
            <StoryBlock eyebrow="02 / Solution" title="The product idea" text={project.solution} />
            <StoryBlock eyebrow="03 / Outcome" title="What it demonstrates" text={project.outcome} />
          </div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="glass mt-24 rounded-[2rem] p-8 md:mt-28 md:p-10"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
                Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Key Features
              </h2>
            </div>

            <p className="max-w-md text-slate-300">
              Features are designed around real user needs, clean workflows, and
              scalable product structure.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300"
              >
                <p className="mb-3 text-sm text-emerald-300">0{index + 1}</p>
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="mt-24 md:mt-28"
        >
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
              Architecture
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Built like a system.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {["Frontend", "API Layer", "Database", "Admin Panel"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
                  className="glass rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-emerald-300/30"
                >
                  <p className="font-bold text-emerald-300">{item}</p>
                </motion.div>
              )
            )}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="glass mt-24 rounded-[2rem] p-8 md:mt-28 md:p-10"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
            Reflection
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            What I learned
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <p className="leading-8 text-slate-300">
              This project improved my ability to think beyond UI and structure
              a product around real user needs, scalable flows, and maintainable
              components.
            </p>

            <p className="leading-8 text-slate-300">
              It also strengthened my understanding of dashboard architecture,
              backend planning, user journeys, and how to present technical work
              clearly.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="premium-button inline-block rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </motion.section>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="glass rounded-3xl p-6"
    >
      <p className="text-xs uppercase tracking-widest text-emerald-300">
        {label}
      </p>
      <h3 className="mt-2 text-2xl font-bold">{value}</h3>
    </motion.div>
  );
}

function StoryBlock({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass rounded-[2rem] p-8 md:p-10"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-black md:text-5xl">{title}</h2>

      <p className="mt-5 text-base leading-8 text-slate-300">{text}</p>
    </motion.div>
  );
}