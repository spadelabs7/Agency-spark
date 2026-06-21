import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Megaphone,
  Search,
  Palette,
  MonitorSmartphone,
  Sparkles,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen & Co — Creative Advertising Agency" },
      { name: "description", content: "Brand, campaign, and digital work for ambitious companies." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Search, title: "SEO & Performance", desc: "Search-first strategies that compound traffic and revenue month over month." },
  { icon: Megaphone, title: "Social Media", desc: "Always-on storytelling across the channels your audience actually lives on." },
  { icon: Palette, title: "Branding & Identity", desc: "Distinct visual systems that make your brand impossible to ignore." },
  { icon: MonitorSmartphone, title: "Web & Product Design", desc: "Conversion-led websites and product surfaces built to ship and scale." },
  { icon: Sparkles, title: "Creative Campaigns", desc: "Big-idea campaigns that turn attention into long-term brand equity." },
  { icon: ShieldCheck, title: "Brand Strategy", desc: "Positioning, messaging, and naming work that gives every asset a backbone." },
];

const campaigns = [
  {
    title: "Nordic Coffee Co.",
    tag: "Brand + Campaign",
    desc: "A complete rebrand and launch campaign that lifted DTC revenue 3.2× in six months.",
    color: "from-amber-200 to-orange-400",
  },
  {
    title: "Hyperloop Fitness",
    tag: "Social + Performance",
    desc: "An always-on social engine that drove 240k new app installs at a 41% lower CAC.",
    color: "from-fuchsia-300 to-rose-500",
  },
  {
    title: "Atlas Outdoor",
    tag: "Web Design + SEO",
    desc: "A new content platform that 5× organic sessions and doubled qualified demo requests.",
    color: "from-emerald-300 to-teal-600",
  },
  {
    title: "Voltic Mobility",
    tag: "Launch Campaign",
    desc: "A national EV launch campaign with 18M impressions and 92% positive sentiment.",
    color: "from-sky-300 to-indigo-600",
  },
];

function HomePage() {
  const [form, setForm] = useState({ name: "", email: "", service: "", details: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service) {
      toast.error("Please fill in name, email, and service.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! We'll be in touch within one business day.");
      setForm({ name: "", email: "", service: "", details: "" });
      setSubmitting(false);
    }, 500);
  };

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" onClick={scrollTo("home")} className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background">L</span>
            Lumen<span className="text-brand">&</span>Co
          </a>
          <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
            {[
              ["Home", "home"],
              ["Services", "services"],
              ["Campaigns", "campaigns"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={scrollTo(id)} className="text-muted-foreground transition-colors hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link to="/admin" className="hidden text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline">Admin</Link>
            <a
              href="#contact"
              onClick={scrollTo("contact")}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.amber.200),transparent_55%),radial-gradient(ellipse_at_bottom_left,theme(colors.rose.200),transparent_50%)] opacity-70" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-widest backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> A creative agency, est. 2014
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
              We build brands<br />people <span className="italic text-brand">actually</span> remember.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Lumen & Co is a full-service advertising agency turning ambitious ideas into campaigns, identities, and digital products that move markets.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={scrollTo("contact")}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#campaigns"
                onClick={scrollTo("campaigns")}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-background"
              >
                See our work
              </a>
            </div>
            <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-foreground/10 pt-8">
              {[["120+", "Brands launched"], ["38", "Awards won"], ["$420M", "Client revenue driven"]].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-bold md:text-4xl">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-brand">Services</p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Everything you need, under one roof.</h2>
            </div>
            <p className="max-w-md text-background/70">Strategy, design, and media — engineered to work as one team and one timeline.</p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-background/10 bg-background/5 p-7 transition-all hover:-translate-y-1 hover:border-brand/60 hover:bg-background/10"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-brand-foreground transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-background/70">{desc}</p>
                <ArrowRight className="absolute right-6 top-7 h-5 w-5 -translate-x-2 text-background/40 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section id="campaigns" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Selected work</p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Recent campaigns.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">A small sample of recent partnerships. Every project is built around measurable outcomes.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {campaigns.map((c, i) => (
              <article
                key={c.title}
                className={`group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl ${i % 3 === 0 ? "md:col-span-2" : ""}`}
              >
                <div className={`relative aspect-[16/9] w-full bg-gradient-to-br ${c.color} overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_50%)]" />
                  <span className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
                    {c.tag}
                  </span>
                  <span className="absolute bottom-5 right-5 font-display text-6xl font-bold text-background/30 mix-blend-overlay md:text-8xl">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6 p-6 md:p-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold md:text-3xl">{c.title}</h3>
                    <p className="mt-2 max-w-xl text-muted-foreground">{c.desc}</p>
                  </div>
                  <button className="shrink-0 rounded-full border border-foreground/20 p-3 transition-all group-hover:bg-foreground group-hover:text-background">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Contact</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Let's start something worth remembering.</h2>
            <p className="mt-4 text-muted-foreground">
              Tell us a little about your project. We'll respond within one business day with next steps and a recommended team.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a href="mailto:hello@lumenandco.com" className="flex items-center gap-3 text-foreground hover:text-brand">
                <Mail className="h-4 w-4" /> hello@lumenandco.com
              </a>
              <div className="flex gap-3 pt-4">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-foreground hover:text-background">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10 lg:col-span-3">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Ada Lovelace"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Service needed" className="md:col-span-2">
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="input"
                >
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </Field>
              <Field label="Project details" className="md:col-span-2">
                <textarea
                  rows={5}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="input resize-none"
                  placeholder="Tell us about your goals, timeline, and budget range."
                />
              </Field>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60 md:w-auto"
            >
              {submitting ? "Sending…" : "Send inquiry"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Lumen & Co. All rights reserved.</p>
          <Link to="/admin" className="hover:text-foreground">Admin panel →</Link>
        </div>
      </footer>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          border-color: var(--color-foreground);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-foreground) 10%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
