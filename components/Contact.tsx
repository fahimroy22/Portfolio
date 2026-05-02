"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { smoothReveal, smoothItem } from "./motionPresets";
import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

export default function Contact() {
  const email = "fahim.ahmed.roy@gmail.com";
  const whatsapp = "https://wa.me/8801863544623";

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      message: String(formData.get("message")),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 pb-24 pt-28 text-white md:px-6 md:pb-28 md:pt-44"
    >
      <div className="pointer-events-none absolute left-1/2 top-20 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-2xl md:h-[420px] md:w-[420px] md:blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-10%] h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-2xl md:h-[520px] md:w-[520px] md:blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={smoothReveal}
          className="mb-12 text-center md:mb-14"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-300">
            Contact
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Let’s build something.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            Have a project, collaboration idea, or freelance work? Send me a
            message directly.
          </p>
        </motion.div>

        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={smoothItem(0)}
            viewport={{ once: true, amount: 0.18 }}
            className="glass relative overflow-hidden rounded-[2rem] p-5 md:p-8"
          >
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-400/10 blur-2xl md:h-72 md:w-72 md:blur-3xl" />

            <div className="relative">
              <div className="mb-7 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-300">
                Available for work
              </div>

              <h3 className="text-2xl font-black leading-tight md:text-3xl">
                Freelance projects, dashboards, portfolios, and full-stack apps.
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                I usually respond through email or WhatsApp. Share your idea,
                budget, timeline, or anything you already have.
              </p>

              <div className="mt-7 space-y-4">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:border-emerald-300/30 hover:bg-white/10"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="mt-1 truncate font-semibold text-white">
                      {copied ? "Copied to clipboard!" : email}
                    </p>
                  </div>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-emerald-300 transition group-hover:bg-emerald-400 group-hover:text-black">
                    {copied ? <FaCheck /> : <FaEnvelope />}
                  </span>
                </button>

                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-emerald-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  <span className="flex items-center gap-3">
                    <FaWhatsapp />
                    Message me on WhatsApp
                  </span>

                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/fahimroy22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
                  >
                    <FaGithub className="text-slate-400 group-hover:text-white" />
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/fahim-roy-6082a634b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
                  >
                    <FaLinkedinIn className="text-slate-400 group-hover:text-white" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={smoothItem(0.07)}
            viewport={{ once: true, amount: 0.18 }}
            className="glass relative overflow-hidden rounded-[2rem] p-5 md:p-8"
          >
            <div className="absolute -left-24 -top-24 h-52 w-52 rounded-full bg-cyan-400/10 blur-2xl md:h-72 md:w-72 md:blur-3xl" />

            <div className="relative grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Your name">
                  <input
                    name="name"
                    required
                    placeholder="Client name"
                    className="contact-input"
                  />
                </Field>

                <Field label="Your email">
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="client@email.com"
                    className="contact-input"
                  />
                </Field>
              </div>

              <Field label="Message">
                <textarea
                  name="message"
                  required
                  rows={7}
                  placeholder="Tell me about your project..."
                  className="contact-input resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="premium-button mt-2 rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending..."
                  : success
                  ? "Message Sent ✓"
                  : "Send Message"}
              </button>

              {error && (
                <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  Something went wrong. Please try again or message me on
                  WhatsApp.
                </p>
              )}

              {success && (
                <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  Thanks! Your message has been sent successfully.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      {children}
    </label>
  );
}