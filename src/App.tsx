import React, { useEffect, useState } from "react";
import "./App.css";
import EntryCard from './data/entries';

/**
 * -------------------------------------------
 * Types
 * -------------------------------------------
 */
type NavItem = {
  id: string;
  label: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  image?: string;
};

type SkillGroup = {
  category: string;
  items: string[];
};

/**
 * -------------------------------------------
 * Utilities
 * -------------------------------------------
 */
const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return { theme, toggle };
};

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * -------------------------------------------
 * Sample Content (replace with your info)
 * -------------------------------------------
 */
const NAV: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/your-username" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username/" },
  
];

const PROJECTS: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "A responsive, accessible portfolio built with React + TypeScript, featuring a dark/light theme and smooth scrolling.",
    tech: ["React", "TypeScript", "Vite"],
    repo: "https://github.com/your-username/portfolio",
    link: "#",
  },
  {
    title: "Data Dashboard",
    description:
      "Interactive analytics dashboard with charts, filters, and export to CSV/PDF.",
    tech: ["React", "Recharts", "Node.js"],
    link: "#",
    repo: "#",
  },
  {
    title: "API Starter",
    description:
      "Clean Node.js REST API boilerplate with authentication, validation, and testing.",
    tech: ["Node.js", "Express", "Jest", "Zod"],
    repo: "#",
  },
];

const RESUME_URL = "/resume.pdf"; // place your resume under /public

/**
 * -------------------------------------------
 * Small UI primitives
 * -------------------------------------------
 */
const Container: React.FC<React.PropsWithChildren<{ id?: string; className?: string }>> = ({
  id,
  className,
  children,
}) => (
  <section
    id={id}
    className={`container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}
  >
    {children}
  </section>
);

const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2
    className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"
    style={{ scrollMarginTop: "6rem" }}
  >
    {children}
  </h2>
);

const Badge: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span
    className="inline-block text-xs px-2 py-1 rounded-md bg-[var(--bg-soft)] text-[var(--text-soft)] border border-[var(--line-soft)]"
    style={{ lineHeight: 1.1 }}
  >
    {children}
  </span>
);

/**
 * -------------------------------------------
 * Layout Components
 * -------------------------------------------
 */
const Header: React.FC<{ nav: NavItem[]; onNavClick: (id: string) => void; onToggleTheme: () => void }> = ({
  nav,
  onNavClick,
  onToggleTheme,
}) => {
  const [open, setOpen] = useState(false);

  // close mobile menu on hash change/scroll target
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-soft)] bg-[var(--bg)]/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <button
          className="font-semibold text-lg"
          onClick={() => onNavClick("home")}
          aria-label="Go to home"
        >
          &lt;LP /&gt;
        </button>

        <div className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <button
              key={n.id}
              className="text-sm hover:underline underline-offset-4"
              onClick={() => onNavClick(n.id)}
            >
              {n.label}
            </button>
          ))}
          <a
            className="text-sm px-3 py-1 border rounded-md hover:bg-[var(--bg-soft)]"
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <button
            className="text-sm px-3 py-1 border rounded-md hover:bg-[var(--bg-soft)]"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title="Toggle light/dark"
          >
            Theme
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="text-sm px-3 py-1 border rounded-md"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            ☼/☾
          </button>
          <button
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="text-xl"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-[var(--line-soft)]">
          <div className="px-4 py-3 flex flex-col gap-2">
            {nav.map((n) => (
              <button
                key={n.id}
                className="text-sm text-left py-2"
                onClick={() => {
                  onNavClick(n.id);
                }}
              >
                {n.label}
              </button>
            ))}
            <a className="text-sm py-2" href={RESUME_URL} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC<{ socials: SocialLink[] }> = ({ socials }) => (
  <footer className="mt-16 border-t border-[var(--line-soft)] py-10">
    <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-[var(--text-soft)]">
        © {new Date().getFullYear()} Leonardo Puente. All rights reserved.
      </p>
      <div className="flex gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:underline underline-offset-4"
            aria-label={s.label}
            title={s.label}
          >
            {s.icon ?? s.label}
          </a>
        ))}
      </div>
    </Container>
  </footer>
);

/**
 * -------------------------------------------
 * Page Sections
 * -------------------------------------------
 */
const Hero: React.FC<{ onContactClick: () => void; socials: SocialLink[] }> = ({
  onContactClick,
  socials,
}) => (
  <Container id="home" className="pt-16 pb-20">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-sm text-[var(--text-soft)] mb-2">Hi, I’m</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Leonardo Puente</h1>
        <p className="mt-4 text-lg text-[var(--text-soft)]">
          Frontend-focused software engineer crafting clean, fast, and accessible web experiences.
          I enjoy turning complex problems into delightful user interfaces.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onContactClick}
            className="px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90"
          >
            Contact Me
          </button>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-md border border-[var(--line-soft)] hover:bg-[var(--bg-soft)]"
          >
            View Resume
          </a>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline underline-offset-4"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative h-48 sm:h-64 md:h-80 rounded-xl border border-[var(--line-soft)] bg-[var(--bg-soft)] overflow-hidden">
        {/* Replace with your photo or illustration */}
        <div className="absolute inset-0 grid place-items-center text-[var(--text-soft)]">
          <span aria-hidden="true">[ Your Photo / Illustration ]</span>
        </div>
      </div>
    </div>
  </Container>
);

const About: React.FC = () => (
  <Container id="about" className="py-16">
    <SectionTitle>About</SectionTitle>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <p className="leading-7">
          I’m a software engineer based in Chicago who thrives at the intersection of design and engineering.
          My focus is building performant, accessible apps with modern frontend tooling and strong UI/UX principles.
        </p>
        <p className="leading-7 mt-4">
          Recently, I’ve been exploring component-driven development, design systems, and performance
          optimization techniques to keep experiences smooth even on low-end devices.
        </p>
      </div>
      <div className="space-y-2">
        <Badge>Open to work</Badge>
        <div className="text-sm text-[var(--text-soft)]">
          <p>Location: Chicago, IL</p>
          <p>Timezone: CST (UTC−6/UTC−5)</p>
        </div>
      </div>
    </div>
  </Container>
);

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <Container id="projects" className="py-16">
    <SectionTitle>Projects</SectionTitle>
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p) => (
        <article
          key={p.title}
          className="group rounded-xl border border-[var(--line-soft)] overflow-hidden hover:shadow-sm bg-[var(--bg)]"
        >
          {p.image ? (
            <img src={p.image} alt={`${p.title} preview`} className="w-full h-44 object-cover" />
          ) : (
            <div className="w-full h-44 bg-[var(--bg-soft)] grid place-items-center text-[var(--text-soft)]">
              <span className="text-sm">No image</span>
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-[var(--text-soft)] mt-2">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              {p.link && (
                <a href={p.link} className="text-sm underline underline-offset-4">
                  Live
                </a>
              )}
              {p.repo && (
                <a href={p.repo} className="text-sm underline underline-offset-4">
                  Repo
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  </Container>
);

const Skills: React.FC<{ skills: SkillGroup[] }> = ({ skills }) => (
  <Container id="skills" className="py-16">
    <SectionTitle>Skills</SectionTitle>
    <div className="grid md:grid-cols-2 gap-8">
      {skills.map((group) => (
        <div key={group.category}>
          <h3 className="font-semibold mb-3">{group.category}</h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Container>
);

const Contact: React.FC = () => (
  <Container id="contact" className="py-16">
    <SectionTitle>Contact</SectionTitle>
    <div className="max-w-2xl">
      <p className="text-lg text-[var(--text-soft)] mb-6">
        I'd love to hear from you. Feel free to reach out via email or connect on social media.
      </p>
      <a
        href="mailto:your-email@example.com"
        className="px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90 inline-block"
      >
        Send Email
      </a>
    </div>
  </Container>
);

const PageContent: React.FC = () => {
  const { toggle } = useTheme();

  const handleNavClick = (id: string) => {
    scrollToId(id);
  };

  const handleContactClick = () => {
    scrollToId("contact");
  };

  return (
    <div className="App">
      <Header nav={NAV} onNavClick={handleNavClick} onToggleTheme={toggle} />
      <main>
        <Hero onContactClick={handleContactClick} socials={SOCIALS} />
        <About />
        <Projects projects={PROJECTS} />
        <Skills skills={[
          { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
          { category: "Frontend", items: ["React", "Next.js", "Redux", "Vite"] },
          { category: "Backend", items: ["Node.js", "Express", "FastAPI", "PostgreSQL"] },
          { category: "Tools", items: ["Git", "Docker", "Vercel", "CI/CD"] },
        ]} />
        <Contact />
      </main>
      <Footer socials={SOCIALS} />
    </div>
  );
};




export default PageContent;

