"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const demos = {
  peerlearn: {
    title: "PeerLearn Demo",
    subtitle: "A learning dashboard preview for students and peer collaboration.",
    stats: ["24 Resources", "8 Study Groups", "142 Messages"],
    accent: "emerald",
  },
  "portfolio-admin": {
    title: "Portfolio Admin Demo",
    subtitle: "A dashboard for managing projects, messages, and portfolio content.",
    stats: ["12 Projects", "34 Messages", "6 Drafts"],
    accent: "cyan",
  },
  "ecommerce-system": {
    title: "E-Commerce Demo",
    subtitle: "A product dashboard preview for orders, products, and customers.",
    stats: ["128 Orders", "42 Products", "$4.2k Sales"],
    accent: "violet",
  },
};

const tabs = ["Dashboard", "Projects", "Messages", "Analytics"];

export default function ProjectDemoPage() {
  const params = useParams();
  const slug = params.slug as keyof typeof demos;
  const demo = demos[slug];

  const [activeTab, setActiveTab] = useState("Dashboard");

  if (!demo) {
    return (
      <main className="min-h-screen px-6 py-28 text-white">
        <Link href="/" className="text-emerald-300">
          ← Back
        </Link>
        <h1 className="mt-10 text-4xl font-black">Demo not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden px-6 py-28 text-white">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-emerald-300 hover:text-emerald-200"
        >
          ← Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-12"
        >
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-32 left-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-300">
              Interactive Live Preview
            </p>

            <h1 className="text-5xl font-black md:text-7xl">{demo.title}</h1>

            <p className="mt-5 max-w-2xl text-slate-300">{demo.subtitle}</p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {demo.stats.map((stat, index) => (
                <motion.div
                  key={stat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-2xl font-bold text-emerald-300">{stat}</p>
                  <p className="mt-1 text-sm text-slate-400">Live metric</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>

                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Product Window
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
                <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-4 px-3 text-xs uppercase tracking-[0.25em] text-slate-500">
                    Navigation
                  </p>

                  <div className="space-y-3">
                    {tabs.map((tab) => {
                      const active = activeTab === tab;

                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`w-full rounded-2xl px-4 py-4 text-left transition ${
                            active
                              ? "bg-emerald-400 text-slate-950"
                              : "bg-white/5 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <div className="min-h-[430px] rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.4 }}
                  >
                    {activeTab === "Dashboard" && <DashboardView />}
                    {activeTab === "Projects" && <ProjectsView />}
                    {activeTab === "Messages" && <MessagesView />}
                    {activeTab === "Analytics" && <AnalyticsView />}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function DashboardView() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-400">Overview of product activity.</p>
        </div>

        <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
          Online
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TiltPanel>
          <p className="text-sm text-slate-400">Recent Activity</p>
          <div className="mt-4 space-y-3">
            {["New resource uploaded", "Study group created", "Client message received"].map(
              (item) => (
                <div key={item} className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">
                  {item}
                </div>
              )
            )}
          </div>
        </TiltPanel>

        <TiltPanel>
          <p className="text-sm text-slate-400">Active Groups</p>
          <div className="mt-4 space-y-3">
            {["Frontend Study", "Backend Builders", "CSE Problem Solving"].map((item) => (
              <div key={item} className="flex justify-between rounded-xl bg-white/5 p-3 text-sm">
                <span>{item}</span>
                <span className="text-emerald-300">Active</span>
              </div>
            ))}
          </div>
        </TiltPanel>

        <TiltPanel className="md:col-span-2">
          <p className="text-sm text-slate-400">Product Health</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {["Performance", "Engagement", "Retention"].map((item, i) => (
              <div key={item}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{item}</span>
                  <span className="text-emerald-300">{86 - i * 7}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${86 - i * 7}%` }}
                    transition={{ duration: 0.9, delay: i * 0.12 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </TiltPanel>
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div>
      <h2 className="text-3xl font-black">Projects</h2>
      <p className="mt-1 text-sm text-slate-400">Project management preview.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["PeerLearn", "Admin Panel", "E-Commerce"].map((project, index) => (
          <TiltPanel key={project}>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              Project 0{index + 1}
            </span>
            <h3 className="mt-5 text-xl font-bold">{project}</h3>
            <p className="mt-2 text-sm text-slate-400">
              Product module with clean UI and scalable structure.
            </p>
          </TiltPanel>
        ))}
      </div>
    </div>
  );
}

function MessagesView() {
  return (
    <div>
      <h2 className="text-3xl font-black">Messages</h2>
      <p className="mt-1 text-sm text-slate-400">Client and user communication preview.</p>

      <div className="mt-6 space-y-4">
        {[
          ["Client", "Can you build a dashboard like this?"],
          ["Fahim", "Yes, I can design and build a clean full-stack dashboard."],
          ["Student", "Can I share resources with my group?"],
          ["Fahim", "Yes, PeerLearn supports resource sharing and collaboration."],
        ].map(([name, text], index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`max-w-[80%] rounded-2xl p-4 text-sm ${
              index % 2 === 0
                ? "bg-white/5 text-slate-300"
                : "ml-auto bg-emerald-400/15 text-emerald-200"
            }`}
          >
            <p className="mb-1 text-xs opacity-70">{name}</p>
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div>
      <h2 className="text-3xl font-black">Analytics</h2>
      <p className="mt-1 text-sm text-slate-400">High-level product analytics.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Users", "Sessions", "Growth"].map((item, index) => (
          <TiltPanel key={item}>
            <p className="text-sm text-slate-400">{item}</p>
            <p className="mt-3 text-3xl font-black text-emerald-300">
              {index === 0 ? "1.2k" : index === 1 ? "8.4k" : "+32%"}
            </p>
          </TiltPanel>
        ))}
      </div>

      <TiltPanel className="mt-5">
        <p className="text-sm text-slate-400">Weekly Activity</p>
        <div className="mt-6 flex h-48 items-end gap-3">
          {[45, 70, 52, 88, 64, 96, 78].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-emerald-400 to-cyan-300"
            />
          ))}
        </div>
      </TiltPanel>
    </div>
  );
}

function TiltPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, x: 50, y: 50 });

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTilt({
      rx: ((y - rect.height / 2) / rect.height) * -8,
      ry: ((x - rect.width / 2) / rect.width) * 8,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  return (
    <motion.div
      onMouseMove={move}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0, x: 50, y: 50 })}
      style={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-150 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${tilt.x}% ${tilt.y}%, rgba(16,185,129,0.18), transparent 42%)`,
        }}
      />
      <div className="relative" style={{ transform: "translateZ(24px)" }}>
        {children}
      </div>
    </motion.div>
  );
}