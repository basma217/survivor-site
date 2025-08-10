"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Trait = {
  id: string;
  title: string;
  teaser: string;
  detail: string;
  tip: string;
  emoji: string;
};

const TRAITS: Trait[] = [
  {
    id: "empathy",
    title: "Empathetic & Nurturing",
    teaser: "The comforter. Always there. Always listening.",
    detail:
      "High empathy can accidentally tolerate bad behavior because you understand the pain behind it.",
    tip: "Keep your empathy, add boundaries. Try: “I care, and I need respect to keep talking.”",
    emoji: "🫶",
  },
  {
    id: "status",
    title: "High-Achieving / ‘Trophy’",
    teaser: "Shiny on the outside… and they love to show you off.",
    detail:
      "Your success or beauty boosts their image. They chase status by standing next to you.",
    tip: "Ask: “Do they celebrate me in private the way they praise me in public?”",
    emoji: "🏆",
  },
  {
    id: "peoplePleaser",
    title: "People-Pleaser / Conflict-Avoidant",
    teaser: "Keeps the peace, pays the price.",
    detail:
      "If fights scare you, you may let things slide. They learn your ‘no’ is negotiable.",
    tip: "Practice one-sentence boundaries: “That doesn’t work for me.” (No essay.)",
    emoji: "🧩",
  },
  {
    id: "selfDoubt",
    title: "Quiet Self-Doubt",
    teaser: "Strong outside, uncertain inside.",
    detail:
      "Hidden insecurity makes unequal treatment feel ‘normal’ and keeps you chasing approval.",
    tip: "Write 3 self-facts daily that don’t depend on anyone’s opinion.",
    emoji: "🪞",
  },
  {
    id: "fixer",
    title: "Optimistic ‘Fixer’",
    teaser: "I can heal them. (They let you try.)",
    detail:
      "Believing you can rescue them feeds the cycle: idealize → devalue → repair → repeat.",
    tip: "Switch goal: from ‘heal them’ to ‘protect me’. Progress = consistent actions, not promises.",
    emoji: "🛠️",
  },
  {
    id: "loyal",
    title: "Very Forgiving & Loyal",
    teaser: "Forgive, forget… repeat?",
    detail:
      "Loyalty is beautiful—until it’s used to reset consequences after every boundary crossing.",
    tip: "Tie forgiveness to change: “I forgive, and the boundary stays.”",
    emoji: "🧷",
  },
];

function FlipCard({ trait }: { trait: Trait }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className="relative cursor-pointer select-none" onClick={() => setFlipped(v => !v)}>
      <AnimatePresence initial={false} mode="wait">
        {!flipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="h-full"
          >
            <div className="rounded-2xl border bg-background p-5 shadow-sm hover:shadow-md">
              <div className="text-3xl">{trait.emoji}</div>
              <h3 className="mt-2 text-lg font-semibold">{trait.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{trait.teaser}</p>
              <button
                onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
                className="mt-4 rounded-lg bg-primary px-3 py-2 text-primary-foreground text-sm"
              >
                Reveal
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="h-full"
          >
            <div className="rounded-2xl border bg-card p-5 shadow-md">
              <h3 className="text-lg font-semibold">{trait.title}</h3>
              <p className="mt-2 text-sm">{trait.detail}</p>
              <div className="mt-3 rounded-xl bg-muted p-3 text-sm">
                <span className="font-medium">Try this:</span> {trait.tip}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                className="mt-4 rounded-lg border px-3 py-2 text-sm"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Page() {
  const [checks, setChecks] = React.useState<string[]>([]);
  const toggle = (id: string) =>
    setChecks((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));

  const score = checks.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Why Narcissists Target Certain Traits</h1>
        <p className="mt-2 text-muted-foreground">
          Tap a card to flip it. Then take the quick self-check for tailored safety tips.
        </p>
      </header>

      {/* Cards grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRAITS.map((t) => (
          <FlipCard key={t.id} trait={t} />
        ))}
      </section>

      {/* Self-check */}
      <section className="mt-12 rounded-2xl border p-6">
        <h2 className="text-2xl font-semibold">Quick Self-Check</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Which of these feel familiar right now? (No judgment—just data for you.)
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {TRAITS.map((t) => (
            <label
              key={t.id}
              className="flex items-start gap-3 rounded-xl border p-3 hover:bg-muted/40"
            >
              <input
                type="checkbox"
                checked={checks.includes(t.id)}
                onChange={() => toggle(t.id)}
                className="mt-1 h-4 w-4"
              />
              <div>
                <div className="font-medium">{t.emoji} {t.title}</div>
                <div className="text-sm text-muted-foreground">{t.teaser}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Results */}
        <div className="mt-6 rounded-xl bg-muted p-4">
          <h3 className="font-semibold">Your snapshot</h3>
          <p className="mt-1 text-sm">
            You selected <span className="font-medium">{score}</span> trait{score === 1 ? "" : "s"}.
            {score === 0 && " Great—stay curious and keep boundaries clear."}
            {score > 0 && score <= 2 && " You’re insightful. Keep early boundaries and reality-check love-bombing."}
            {score >= 3 && score <= 4 && " Consider pre-written scripts for pushback and a weekly check-in with a trusted friend."}
            {score >= 5 && " Build a safety plan: boundaries in writing, pattern tracking, and a ‘pause pact’ before big commitments."}
          </p>
          {score > 0 && (
            <ul className="mt-3 list-disc pl-5 text-sm">
              <li>Create a <span className="font-medium">“No Essays” rule</span>: boundary = 1 sentence.</li>
              <li><span className="font-medium">Delay decisions</span> 24 hours after intense praise or drama.</li>
              <li><span className="font-medium">Track consistency</span>: promises vs. actions for 2 weeks.</li>
            </ul>
          )}
        </div>
      </section>

      <footer className="mt-10 text-xs text-muted-foreground">
        This tool is educational, not diagnostic. If you feel unsafe, prioritize your safety plan.
      </footer>
    </main>
  );
}
