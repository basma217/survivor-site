"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // ✅ Added

/** ─────────────────────────────────────────────────────────────────────────────
 * Types & Data
 * ────────────────────────────────────────────────────────────────────────────*/
type Scenario = {
  id: number;
  title: string;
  scene: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "SCENARIO 1: THE DINNER DATE",
    scene:
      "You’re on a dinner date with Alex. Every time you start sharing a story, Alex interrupts to talk about themselves. When the waiter compliments your outfit, Alex immediately mentions how they once got mistaken for a model.",
    question: "What behavior stands out as narcissistic?",
    options: [
      "A) Interrupting your story",
      "B) Mentioning being mistaken for a model",
      "C) Taking the compliment personally",
      "D) All of the above",
    ],
    correctIndex: 3,
    explanation:
      "Narcissists often redirect attention to themselves, interrupt others, and struggle to let others have the spotlight.",
  },
  {
    id: 2,
    title: "SCENARIO 2: THE TEAM PROJECT",
    scene:
      "Jenna was late to every meeting but takes full credit for the team's successful presentation. When someone mentions your contribution, Jenna says, “Well, I basically carried the team.”",
    question: "Which behavior best reflects narcissistic traits?",
    options: [
      "A) Being late",
      "B) Dismissing your contribution",
      "C) Taking full credit for the team",
      "D) B and C",
    ],
    correctIndex: 3,
    explanation:
      "Chronic lateness can be disrespectful, but dismissing others and claiming all the credit are classic narcissistic patterns (grandiosity + devaluing).",
  },
  {
    id: 3,
    title: "SCENARIO 3: THE GROUP CHAT",
    scene:
      "In your friend group chat, Sam posts a long rant whenever the topic isn’t about them. When others share wins, Sam goes silent or makes a cutting joke.",
    question: "Which pattern is the biggest red flag?",
    options: [
      "A) Needing attention sometimes",
      "B) Making jokes",
      "C) Withdrawing when others succeed",
      "D) Disliking group chats",
    ],
    correctIndex: 2,
    explanation:
      "Devaluing or withdrawing when others get attention points to fragile self-esteem and envy—both common in narcissistic dynamics.",
  },
];

/** ─────────────────────────────────────────────────────────────────────────────
 * Small UI bits
 * ────────────────────────────────────────────────────────────────────────────*/
function Progress({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-sm text-slate-600">
        <span>
          Question{" "}
          <span className="font-semibold text-slate-800">{current + 1}</span> /{" "}
          {total}
        </span>
        <span className="font-medium">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-pink-100">
        <motion.div
          className="h-2 rounded-full bg-pink-600"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>
    </div>
  );
}

/** ─────────────────────────────────────────────────────────────────────────────
 * Page
 * ────────────────────────────────────────────────────────────────────────────*/
export default function QuizPage()  {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);

  const total = SCENARIOS.length;
  const current = SCENARIOS[index];
  const finished = index === total - 1 && showFeedback;

  function handlePick(optionIndex: number) {
    if (showFeedback) return;
    setSelected(optionIndex);
    const isCorrect = optionIndex === current.correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    setShowFeedback(true);
  }

  function handleNext() {
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      // end reached; keep showFeedback so end panel shows
      setShowFeedback(true);
    }
  }

  function handleRestart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowFeedback(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-pink-700 text-xs font-semibold tracking-wide">
            LIGHT PINK • SCREAMING POWER
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-pink-900">
            Spot the Narcissistic Behavior
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            Read each scenario, pick the best answer, then learn why.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress current={index} total={total} />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-pink-200 bg-white shadow-sm p-6 space-y-5">
          <h2 className="text-lg md:text-xl font-extrabold text-pink-800">
            {current.title}
          </h2>
          <p className="text-sm md:text-base text-slate-700">{current.scene}</p>

          <div className="rounded-xl border border-pink-100 bg-pink-50 p-4">
            <p className="font-semibold text-pink-900">{current.question}</p>
          </div>

          {/* Options */}
          <div className="grid gap-2">
            {current.options.map((opt, i) => {
              const isChosen = selected === i;
              const isCorrect = i === current.correctIndex;
              const correctColor =
                showFeedback && isCorrect && isChosen
                  ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                  : "";
              const wrongColor =
                showFeedback && !isCorrect && isChosen
                  ? "bg-rose-50 border-rose-400 text-rose-800"
                  : "";
              const base =
                "text-left border px-4 py-3 rounded-lg transition-all duration-150 text-slate-800";

              return (
                <button
                  key={i}
                  onClick={() => handlePick(i)}
                  disabled={showFeedback}
                  className={[
                    base,
                    isChosen
                      ? "ring-2 ring-pink-400 shadow-sm scale-[1.01]"
                      : "hover:bg-pink-50",
                    correctColor,
                    wrongColor,
                    showFeedback ? "cursor-default" : "cursor-pointer",
                  ].join(" ")}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-xl border p-4 bg-gradient-to-br from-pink-50 to-rose-50"
              >
                <p className="font-bold text-pink-900 mb-1">
                  {selected === current.correctIndex
                    ? "Correct ✅"
                    : "Not quite ❌"}
                </p>
                <p className="text-slate-700">{current.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-slate-600">
              Score:{" "}
              <span className="font-semibold text-slate-900">{score}</span> /{" "}
              {total}
            </span>

            {!finished ? (
              <motion.button
                onClick={handleNext}
                disabled={!showFeedback}
                initial={false}
                animate={{
                  opacity: showFeedback ? 1 : 0.5,
                  scale: showFeedback ? 1 : 0.98,
                }}
                className="px-4 py-2 rounded-md text-sm font-extrabold tracking-wide bg-pink-600 text-white hover:bg-pink-700 disabled:cursor-not-allowed"
              >
                {index + 1 < total ? "Next" : "Finish"}
              </motion.button>
            ) : (
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-md text-sm font-extrabold tracking-wide bg-pink-600 text-white hover:bg-pink-700"
              >
                Restart Quiz
              </button>
            )}
          </div>
        </div>

        {/* Final message */}
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-pink-200 p-5 bg-white shadow-sm space-y-3"
          >
            <h3 className="text-xl font-black text-pink-800">All done 🎉</h3>
            <p className="text-slate-700">
              You scored{" "}
              <span className="font-semibold text-pink-900">{score}</span> out
              of {total}. Power isn’t shouting the loudest—it’s seeing the
              pattern and choosing yourself.
            </p>
            <div className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 rounded-md text-sm font-extrabold bg-pink-600 text-white hover:bg-pink-700"
              >
                Read Real Stories
              </Link>
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-md text-sm font-extrabold border border-pink-300 text-pink-800 hover:bg-pink-50"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
