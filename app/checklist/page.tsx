"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Heart, Info, CheckCircle2, AlertTriangle, X, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/** ---------- Data ---------- */
type Item = {
  id: string;
  label: string;
  hint?: string; // shows on hover
};

type Category = {
  id: string;
  title: string;
  emoji: string;
  items: Item[];
};

const CATEGORIES: Category[] = [
  {
    id: "gaslighting",
    title: "Reality Twists",
    emoji: "🌀",
    items: [
      { id: "denial", label: "Denies things they said/did", hint: "You heard/remembered it clearly, but they insist you didn’t." },
      { id: "memory", label: "Rewrites the past", hint: "“I never promised that.” despite evidence." },
      { id: "blameflip", label: "Flips blame onto you", hint: "You end up apologizing for their outburst." },
    ],
  },
  {
    id: "control",
    title: "Control & Power",
    emoji: "🎛️",
    items: [
      { id: "isolation", label: "Isolates you from friends/family" },
      { id: "rules", label: "Unspoken rules you must follow", hint: "Walking on eggshells to keep the peace." },
      { id: "privacy", label: "Invades your privacy", hint: "Checks your phone, email, locations." },
    ],
  },
  {
    id: "empathy",
    title: "Empathy Gaps",
    emoji: "🧊",
    items: [
      { id: "minimize", label: "Minimizes your feelings", hint: "“You’re too sensitive.”" },
      { id: "shame", label: "Uses shame or sarcasm as a weapon" },
      { id: "discard", label: "Warm one day, cold the next", hint: "Love‑bomb ➜ devalue ➜ withdraw." },
    ],
  },
  {
    id: "boundaries",
    title: "Boundary Breakers",
    emoji: "🚧",
    items: [
      { id: "no", label: "Ignores or punishes your “no”" },
      { id: "strings", label: "Gifts/favors come with strings" },
      { id: "double", label: "Double standards", hint: "Rules for you, flexibility for them." },
    ],
  },
];

/** ---------- Helpers ---------- */
function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = React.useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key, val]);
  return [val, setVal] as const;
}

function cn(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}

/** ---------- UI Bits ---------- */
function Pill({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "group w-full text-left rounded-xl border px-3 py-3 transition-all flex items-start gap-3",
        checked ? "bg-purple-50 border-purple-300 shadow-sm" : "hover:bg-muted/40"
      )}
      aria-pressed={checked}
    >
      <div className={cn("mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0",
        checked ? "bg-purple-600 border-purple-600 text-white" : "border-gray-300"
      )}>
        {checked ? <CheckCircle2 className="h-4 w-4" /> : null}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">{label}</span>
          {hint && (
            <span className="relative">
              <Info className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-5 top-1 z-10 hidden whitespace-nowrap rounded-md border bg-white px-2 py-1 text-xs text-gray-700 shadow-sm group-hover:block">
                {hint}
              </span>
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Checked {value}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          className="h-2 bg-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

/** ---------- Page ---------- */
export default function RedFlagChecklist() {
  const allIds = CATEGORIES.flatMap((c) => c.items.map((i) => i.id));
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    "redflag-checklist",
    {}
  );
  const [showSummary, setShowSummary] = React.useState(false);

  const total = allIds.length;
  const count = allIds.reduce((a, id) => a + (checked[id] ? 1 : 0), 0);

  function toggle(id: string) {
    setChecked((s) => ({ ...s, [id]: !s[id] }));
  }

  function reset() {
    setChecked({});
    setShowSummary(false);
  }

  const tier =
    count === 0 ? "none" :
    count <= 3 ? "light" :
    count <= 7 ? "moderate" : "high";

  const tierCopy: Record<typeof tier, { title: string; note: string; icon: React.ReactNode; tone: string }> = {
    none: {
      title: "No red flags selected",
      note: "This tool isn’t diagnostic. Trust your gut; if something still feels off, your feelings matter.",
      icon: <Heart className="h-6 w-6 text-green-600" />,
      tone: "text-green-700",
    },
    light: {
      title: "A few concerns noticed",
      note: "Even small patterns can wear you down. Consider journaling specifics and talking with someone you trust.",
      icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
      tone: "text-amber-700",
    },
    moderate: {
      title: "Multiple concerning patterns",
      note: "You deserve steadiness and respect. Reality‑check with allies and set firm boundaries. If it escalates, make a safety plan.",
      icon: <ShieldAlert className="h-6 w-6 text-orange-600" />,
      tone: "text-orange-700",
    },
    high: {
      title: "High pattern density",
      note: "This looks heavy. Please consider reaching out to a licensed professional or a local support org. If you feel unsafe, prioritize a safety plan.",
      icon: <ShieldAlert className="h-6 w-6 text-red-600" />,
      tone: "text-red-700",
    },
  }[tier];

  const selectedByCategory = CATEGORIES.map((cat) => ({
    cat,
    selected: cat.items.filter((i) => checked[i.id]),
  })).filter((x) => x.selected.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
      <section className="pt-12 pb-6">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white/70 backdrop-blur">
              <Heart className="h-3.5 w-3.5" /> Gentle Self‑Check
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">
              Red Flag Checklist
            </h1>
            <p className="mt-2 text-muted-foreground">
              Tick the behaviors you’ve noticed. Your results stay on your device (saved to your browser only).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5 md:p-6 space-y-5">
              <ProgressBar value={count} total={total} />

              <div className="grid md:grid-cols-2 gap-5">
                {CATEGORIES.map((cat, ci) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: ci * 0.04 }}
                    className="rounded-xl border bg-white/70 backdrop-blur p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{cat.emoji}</span>
                      <h3 className="font-semibold">{cat.title}</h3>
                    </div>

                    <div className="space-y-2">
                      {cat.items.map((it) => (
                        <Pill
                          key={it.id}
                          checked={!!checked[it.id]}
                          onChange={() => toggle(it.id)}
                          label={it.label}
                          hint={it.hint}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={() => setShowSummary(true)} className="gap-2">
                  See Summary <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={reset} className="gap-2">
                  <RotateCcw className="h-4 w-4" /> Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-gray-500">
            This educational checklist is not therapy or a diagnosis. If you’re in danger, consider contacting local emergency services or a trusted hotline in your region.
          </p>
        </div>
      </section>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setShowSummary(false)} />
            <motion.div
              className="relative w-full max-w-lg rounded-2xl border bg-white p-6 shadow-xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <div className="flex items-start gap-3">
                {tierCopy.icon}
                <div>
                  <h3 className={cn("text-lg font-semibold", tierCopy.tone)}>{tierCopy.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    You selected <strong>{count}</strong> item{count === 1 ? "" : "s"} out of {total}.
                  </p>
                </div>
                <button className="ml-auto rounded-md p-1 hover:bg-gray-100" onClick={() => setShowSummary(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedByCategory.length > 0 && (
                <div className="mt-4 space-y-3">
                  {selectedByCategory.map(({ cat, selected }) => (
                    <div key={cat.id} className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span>{cat.emoji}</span>
                        <span className="text-sm font-medium">{cat.title}</span>
                      </div>
                      <ul className="text-sm text-gray-700 list-disc pl-5">
                        {selected.map((s) => (
                          <li key={s.id}>{s.label}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-900">
                <p>{tierCopy.note}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button onClick={() => setShowSummary(false)}>Keep Editing</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const text = [
                      "Red Flag Checklist — My Notes",
                      `Selected: ${count}/${total}`,
                      "",
                      ...selectedByCategory.flatMap(({ cat, selected }) =>
                        selected.length
                          ? [`${cat.title}:`, ...selected.map((s) => `• ${s.label}`), ""]
                          : []
                      ),
                    ].join("\n");
                    navigator.clipboard.writeText(text);
                  }}
                >
                  Copy to Clipboard
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
