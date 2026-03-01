"use client";

import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ─── SITE DATA ────────────────────────────────────────────────────────────────
// ✏️  Edit everything in this section to personalise your site.

const PROFILE = {
  name: "Yevhenii (Eugene) Tkachenko",
  role: "Staff Software Developer",
  bio: "I build thoughtful digital experiences that live at the intersection of design and engineering. I care deeply about simplicity, craft, and the small details that make technology feel human.",
  location: "Waterloo, Canada 🇨🇦",
  social: {
    github: "https://github.com/jekatka",
    linkedin: "https://www.linkedin.com/in/yev-tka/",
    email: "mailto:jekatka@gmail.com",
    twitter: "https://x.com/jekatka_",
  },
};

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  url: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    title: "Secret Project",
    subtitle: "Cooking some amazing iOS app",
    description:
      "A mobile app that helps people manage their daily workflow without distractions.",
    tags: ["SwiftUI", "Swift", "iOS", "macOS"],
    url: "#",
    accent: "from-blue-400 to-blue-600",
  },
  // {
  //   title: "Project Beta",
  //   subtitle: "Open source library",
  //   description:
  //     "An open source library used by developers around the world. Focused on developer experience and reliability.",
  //   tags: ["TypeScript", "npm", "API"],
  //   url: "#",
  //   accent: "from-violet-400 to-violet-600",
  // },
  // {
  //   title: "Project Gamma",
  //   subtitle: "Mobile app",
  //   description:
  //     "A minimal, privacy-first mobile app that helps people manage their daily workflow without distractions.",
  //   tags: ["React Native", "Expo", "SQLite"],
  //   url: "#",
  //   accent: "from-emerald-400 to-emerald-600",
  // },
  // {
  //   title: "Project Delta",
  //   subtitle: "Developer tool",
  //   description:
  //     "A CLI tool that automates repetitive development tasks, saving hours of manual work per week.",
  //   tags: ["Node.js", "CLI", "Automation"],
  //   url: "#",
  //   accent: "from-orange-400 to-orange-600",
  // },
];

interface Experience {
  company: string;
  domain: string;      // used to fetch logo via clearbit (fallback)
  logoPath?: string;   // local file in /public/logos/ — takes priority over clearbit
  url: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

const EXPERIENCE: Experience[] = [
  {
    company: "Frontrow",
    domain: "frontro.com",
    logoPath: "/logos/frontrow-logo.png",
    url: "https://frontro.com",
    role: "Staff Software Developer",
    period: "2023 — Present",
    description:
      "Leading architecture decisions for a high-traffic platform serving 8 millions of users. Mentoring a team of 4 engineers, and shipping features that meaningfully improved core product metrics.",
    tags: ["Golang", "TypeScript", "k8s", "AWS", "PostgreSQL", "Redis", "NATS"],
  },
  {
    company: "TextNow",
    domain: "textnow.com",
    logoPath: "/logos/textnow-logo.jpeg",
    url: "https://www.textnow.com",
    role: "Senior Software Developer",
    period: "2021 — 2023",
    description:
      "Built and maintained a suite of internal developer tools that reduced deployment time by 60%. Collaborated closely with VoIP engineering team to build a new VoIP service that allows users to make and receive calls over the internet.",
    tags: ["Go", "PHP", "k8s", "AWS", "PostgreSQL", "microservices"],
  },
  {
    company: "PlutoTV",
    domain: "pluto.tv",        // ✏️ replace with actual domain
    logoPath: "/logos/plutotv-logo.png",
    url: "https://pluto.tv",
    role: "Senior Software Developer",
    period: "2018 — 2021",
    description:
      "Part of the core API team, designing and scaling dozens of microservices powering a platform with 32M+ monthly active users. Drove significant improvements in code quality, reliability, and system performance across the backend.",
    tags: ["Go", "TypeScript", "k8s", "AWS", "PostgreSQL", "MongoDB"],
  },
  {
    company: "Meetup",
    domain: "meetup.com",        // ✏️ replace with actual domain
    logoPath: "/logos/meetup-logo.jpeg",
    url: "https://www.meetup.com",
    role: "Senior Full Stack Developer",
    period: "2017 — 2018",
    description: "Engineered a new payment module with flexible pricing tiers that drove a 60% increase in revenue. Designed and built a library of reusable, highly configurable payment UI components adopted across the platform — easy to extend and maintain.",
    tags: ["TypeScript", "React", "Node.js", "Stripe"],
  },
];

const NOW = [
  {
    prefix: "Currently",
    text: "building my personal website and exploring new side projects in the open.",
  },
  {
    prefix: "Recently",
    text: "shipped a full-stack application using Next.js, Supabase, and Tailwind CSS.",
  },
  {
    prefix: "Learning",
    text: "SwiftUI 🍎 (yes, a web dev learning Apple stuff — plot twist), Supabase 🐘, and how to make AI do my job so I can take longer coffee breaks ☕🤖.",
  },
  {
    prefix: "Looking forward",
    text: "to building my first iOS app and kicking off my indie dev journey 📱🚀 — one SwiftUI view at a time.",
  },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const NAV_ITEMS = ["Projects", "Experience", "Now"] as const;
type NavItem = (typeof NAV_ITEMS)[number];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavItem>("Projects");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      {/* ── Sticky Header ──────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-zinc-200 bg-[#FAFAFA]/85 backdrop-blur-md"
      >
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
          <span className="font-display font-semibold text-sm tracking-tight text-[#09090B]">
            {PROFILE.name}
          </span>
          <nav className="flex items-center gap-3" aria-label="Social links">
            <Link
              href={PROFILE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer p-1"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer p-1"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href={PROFILE.social.email}
              aria-label="Email"
              className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer p-1"
            >
              <Mail className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </motion.header>

      <main className="mx-auto max-w-2xl px-6">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="pt-20 pb-16"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.25rem] font-bold tracking-tight leading-[1.15] mb-6 text-[#09090B]"
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              {PROFILE.name}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-0.5 left-0 right-0 h-[3px] bg-[#2563EB] origin-left rounded-full"
              />
            </span>
            !
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[15px] leading-[1.75] text-zinc-600 mb-4 max-w-lg"
          >
            {PROFILE.bio}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-1.5 text-xs text-zinc-400"
          >
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{PROFILE.location}</span>
          </motion.div>
        </motion.div>

        {/* ── Section Nav ────────────────────────────────────────── */}
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          aria-label="Page sections"
          className="flex items-center gap-0 border-b border-zinc-200 mb-14"
          style={{ transitionDelay: "0.35s" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-t ${
                activeNav === item
                  ? "text-[#09090B]"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {item}
              {activeNav === item && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#09090B] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </motion.nav>

        {/* ── Section Content ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {/* Projects */}
          {activeNav === "Projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <AnimatedSection>
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-lg font-semibold mb-8 text-[#09090B]"
                >
                  I build{" "}
                  <span className="font-bold underline underline-offset-4 decoration-2 decoration-zinc-300">
                    things
                  </span>{" "}
                  for people
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECTS.map((project) => (
                    <motion.a
                      key={project.title}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeUp}
                      whileHover={{
                        y: -4,
                        boxShadow:
                          "0 12px 32px -8px rgba(0,0,0,0.12), 0 4px 12px -4px rgba(0,0,0,0.06)",
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="group block border border-zinc-200 rounded-2xl overflow-hidden cursor-pointer bg-white hover:border-zinc-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    >
                      {/* Accent bar */}
                      <div
                        className={`h-1 w-full bg-gradient-to-r ${project.accent}`}
                      />
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-1.5">
                          <h3 className="font-display font-semibold text-sm text-[#09090B] leading-snug">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 ml-2 mt-0.5" />
                        </div>
                        <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide mb-3">
                          {project.subtitle}
                        </p>
                        <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-md font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </AnimatedSection>
            </motion.div>
          )}

          {/* Experience */}
          {activeNav === "Experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <AnimatedSection>
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-lg font-semibold mb-8 text-[#09090B]"
                >
                  Where I&apos;ve worked
                </motion.h2>

                <div className="flex flex-col gap-0">
                  {EXPERIENCE.map((job, i) => (
                    <motion.div
                      key={job.company}
                      variants={fadeUp}
                      className={`flex gap-4 py-7 ${
                        i < EXPERIENCE.length - 1
                          ? "border-b border-zinc-100"
                          : ""
                      }`}
                    >
                      {/* Company logo */}
                      <div className="flex-shrink-0 mt-0.5">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-10 h-10 rounded-xl border border-zinc-200 overflow-hidden bg-white cursor-pointer hover:border-zinc-300 transition-colors duration-200"
                          tabIndex={-1}
                        >
                          <img
                            src={
                              job.logoPath ??
                              `https://logo.clearbit.com/${job.domain}`
                            }
                            alt={`${job.company} logo`}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              // Fallback: show coloured initial
                              const el = e.currentTarget;
                              el.style.display = "none";
                              const parent = el.parentElement!;
                              parent.style.display = "flex";
                              parent.style.alignItems = "center";
                              parent.style.justifyContent = "center";
                              parent.style.background = "#f4f4f5";
                              parent.style.fontSize = "14px";
                              parent.style.fontWeight = "600";
                              parent.style.color = "#18181b";
                              parent.textContent = job.company[0];
                            }}
                          />
                        </a>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-0.5">
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span className="font-display font-semibold text-sm text-[#09090B] group-hover/link:text-[#2563EB] transition-colors duration-200">
                              {job.company}
                            </span>
                            <ArrowUpRight className="w-3 h-3 text-zinc-300 group-hover/link:text-[#2563EB] transition-colors duration-200" />
                          </a>
                          <span className="text-[11px] text-zinc-400 flex-shrink-0 tabular-nums pt-0.5">
                            {job.period}
                          </span>
                        </div>

                        <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide mb-3">
                          {job.role}
                        </p>

                        <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-md font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </motion.div>
          )}

          {/* Now */}
          {activeNav === "Now" && (
            <motion.div
              key="now"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <AnimatedSection>
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-lg font-semibold mb-2 text-[#09090B]"
                >
                  Now
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-xs text-zinc-400 mb-8"
                >
                  A snapshot of what I&apos;m up to right now.
                </motion.p>

                <div className="flex flex-col gap-6">
                  {NOW.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex gap-4"
                    >
                      <span className="font-display font-semibold text-xs text-[#09090B] flex-shrink-0 w-24 pt-0.5">
                        {item.prefix}
                      </span>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom spacer */}
        <div className="h-24" />
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-2xl px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-xs text-zinc-500 font-medium mb-1">
                {PROFILE.name}
              </p>
              <p className="text-xs text-zinc-400">
                © {new Date().getFullYear()} — Built with ❤️ from 🇨🇦🇺🇦
              </p>
            </div>

            <nav
              aria-label="Footer links"
              className="flex items-center gap-5"
            >
              {[
                { label: "GitHub", href: PROFILE.social.github },
                { label: "LinkedIn", href: PROFILE.social.linkedin },
                { label: "Twitter", href: PROFILE.social.twitter },
                { label: "Email", href: PROFILE.social.email },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200 cursor-pointer"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
