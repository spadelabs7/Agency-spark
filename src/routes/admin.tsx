import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutGrid,
  Briefcase,
  Inbox,
  Pencil,
  Trash2,
  Plus,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Lumen & Co" }] }),
  component: AdminPage,
});

type Tab = "services" | "campaigns" | "inquiries";

const initialServices = [
  { id: 1, name: "SEO & Performance", price: "$4,500/mo", status: "Active" },
  { id: 2, name: "Social Media", price: "$3,200/mo", status: "Active" },
  { id: 3, name: "Branding & Identity", price: "$25,000", status: "Active" },
  { id: 4, name: "Web & Product Design", price: "$45,000", status: "Active" },
  { id: 5, name: "Creative Campaigns", price: "Custom", status: "Draft" },
];

const initialCampaigns = [
  { id: 1, client: "Nordic Coffee Co.", title: "Slow Mornings", status: "Live", budget: "$120k" },
  { id: 2, client: "Hyperloop Fitness", title: "Move Faster", status: "Live", budget: "$340k" },
  { id: 3, client: "Atlas Outdoor", title: "Find North", status: "In Production", budget: "$210k" },
  { id: 4, client: "Voltic Mobility", title: "Charge Forward", status: "Completed", budget: "$580k" },
];

const initialInquiries = [
  { id: 1, name: "Maya Singh", email: "maya@brewworks.io", service: "Branding & Identity", details: "Looking to rebrand our specialty coffee line ahead of a retail launch in Q3.", date: "2026-06-18" },
  { id: 2, name: "Tom Becker", email: "tom@northshore.co", service: "SEO & Performance", details: "Need organic growth across 3 product categories. Currently flat YoY.", date: "2026-06-19" },
  { id: 3, name: "Priya Khan", email: "priya@helios-ev.com", service: "Creative Campaigns", details: "Launching our flagship EV in October — need a national hero campaign.", date: "2026-06-20" },
];

function AdminPage() {
  const [tab, setTab] = useState<Tab>("services");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState(initialServices);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [inquiries, setInquiries] = useState(initialInquiries);

  const nav: { id: Tab; label: string; icon: typeof LayoutGrid; count: number }[] = [
    { id: "services", label: "Manage Services", icon: LayoutGrid, count: services.length },
    { id: "campaigns", label: "Manage Campaigns", icon: Briefcase, count: campaigns.length },
    { id: "inquiries", label: "View Inquiries", icon: Inbox, count: inquiries.length },
  ];

  const onEdit = (type: string, id: number) => toast.info(`Edit ${type} #${id} (mock)`);
  const onDelete = (type: string, id: number) => {
    if (type === "service") setServices((s) => s.filter((x) => x.id !== id));
    if (type === "campaign") setCampaigns((s) => s.filter((x) => x.id !== id));
    if (type === "inquiry") setInquiries((s) => s.filter((x) => x.id !== id));
    toast.success(`${type[0].toUpperCase()}${type.slice(1)} deleted`);
  };
  const onAdd = () => toast.info("New record dialog (mock)");

  return (
    <div className="flex min-h-screen bg-secondary/40">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-border bg-foreground text-background transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-background/10 px-6">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground">L</span>
            Lumen<span className="text-brand">&</span>Co
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="rounded p-1 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-background/40">Workspace</p>
          {nav.map((n) => {
            const active = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setTab(n.id);
                  setSidebarOpen(false);
                }}
                className={`mt-1 flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-brand text-brand-foreground" : "text-background/80 hover:bg-background/10"
                }`}
              >
                <span className="flex items-center gap-3">
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-brand-foreground/15" : "bg-background/10"}`}>
                  {n.count}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-background/15 px-3 py-2.5 text-sm text-background/80 transition-colors hover:bg-background/10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg border border-border p-2 lg:hidden">
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">{nav.find((n) => n.id === tab)?.label}</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">Admin workspace · mock data</p>
            </div>
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" /> New
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {tab === "services" && (
            <DataTable
              columns={["Service", "Pricing", "Status", ""]}
              rows={services.map((s) => [
                <strong key="n" className="font-semibold">{s.name}</strong>,
                <span key="p" className="text-muted-foreground">{s.price}</span>,
                <Status key="s" value={s.status} />,
                <Actions key="a" onEdit={() => onEdit("service", s.id)} onDelete={() => onDelete("service", s.id)} />,
              ])}
            />
          )}
          {tab === "campaigns" && (
            <DataTable
              columns={["Campaign", "Client", "Status", "Budget", ""]}
              rows={campaigns.map((c) => [
                <strong key="t" className="font-semibold">{c.title}</strong>,
                <span key="c" className="text-muted-foreground">{c.client}</span>,
                <Status key="s" value={c.status} />,
                <span key="b" className="font-medium">{c.budget}</span>,
                <Actions key="a" onEdit={() => onEdit("campaign", c.id)} onDelete={() => onDelete("campaign", c.id)} />,
              ])}
            />
          )}
          {tab === "inquiries" && (
            <DataTable
              columns={["Name", "Email", "Service", "Details", "Date", ""]}
              rows={inquiries.map((i) => [
                <strong key="n" className="font-semibold">{i.name}</strong>,
                <a key="e" href={`mailto:${i.email}`} className="text-muted-foreground hover:text-foreground">{i.email}</a>,
                <span key="s" className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">{i.service}</span>,
                <span key="d" className="line-clamp-2 max-w-md text-sm text-muted-foreground">{i.details}</span>,
                <span key="dt" className="text-sm text-muted-foreground">{i.date}</span>,
                <Actions key="a" onEdit={() => onEdit("inquiry", i.id)} onDelete={() => onDelete("inquiry", i.id)} />,
              ])}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/50">
            <tr>
              {columns.map((c, i) => (
                <th key={i} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0 transition-colors hover:bg-secondary/40">
                {row.map((cell, j) => (
                  <td key={j} className="px-5 py-4 align-middle">{cell}</td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={columns.length} className="px-5 py-12 text-center text-muted-foreground">No records.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Status({ value }: { value: string }) {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Live: "bg-emerald-100 text-emerald-700",
    Draft: "bg-amber-100 text-amber-700",
    "In Production": "bg-sky-100 text-sky-700",
    Completed: "bg-zinc-200 text-zinc-700",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${map[value] ?? "bg-secondary"}`}>{value}</span>;
}

function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex justify-end gap-1.5">
      <button
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
      >
        <Pencil className="h-3.5 w-3.5" /> Edit
      </button>
      <button
        onClick={onDelete}
        className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-background px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
      >
        <Trash2 className="h-3.5 w-3.5" /> Delete
      </button>
    </div>
  );
}
