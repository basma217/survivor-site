"use client";

import * as React from "react";

/**
 * Strong types for scenarios
 */
type Scenario = {
  id: number;
  title: string;
  scene: string;
  question: string;
  options: string[];
  correctIndex: number; // index of the correct option
  explanation: string;
};

/**
 * Your quiz data. Add more scenarios as you wish.
 */
const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "SCENARIO 1: THE DINNER DATE",
    scene:
      "You’re on a dinner date with Alex. Every time you start sharing a story, Alex interrupts to talk about themselves. When the waiter compliments your outfit, Alex immediately mentions how they once got mistaken for a model.",
    question:
      "What behavior stands out as narcissistic?",
    options: [
      "A) Interrupting your story",
      "B) Mentioning being mistaken for a model",
      "C) Taking the compliment personally",
      "D) All of the above",
    ],
    correctIndex: 3, // D
    explanation:
      "Narcissists often redirect attention to themselves, interrupt others, and struggle to let others have the spotlight.",
  },
  {
    id: 2,
    title: "SCENARIO 2: THE TEAM PROJECT",
    scene:
      "Jenna was late to every meeting but takes full credit for the team's successful presentation. When someone mentions your contribution, Jenna says, “Well, I basically carried the team.”",
    question:
      "Which behavior best reflects narcissistic traits?",
    options: [
      "A) Being late",
      "B) Dismissing your contribution",
      "C) Taking full credit for the team",
      "D) B and C",
    ],
    correctIndex: 3, // D (B and C)
    explanation:
      "Chronic lateness can be disrespectful, but dismissing others and claiming all the credit are classic narcissistic patterns (grandiosity + devaluing).",
  },
];

/**
 * Small, simple progress bar
 */
function Progress({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>Question {current + 1} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * One-question-at-a-time quiz flow
 */
export default function QuizPage(): JSX.Element {
  const [index, setIndex] = React.useState<number>(0); // which scenario we are on
  const [selected, setSelected] = React.useState<number | null>(null); // which option user picked
  const [score, setScore] = React.useState<number>(0); // total correct so far
  const [showFeedback, setShowFeedback] = React.useState<boolean>(false); // show explanation after pick

  const total = SCENARIOS.length;
  const current = SCENARIOS[index];

  function handlePick(optionIndex: number) {
    if (showFeedback) return; // prevent double clicking after feedback is shown
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
      // finished; keep feedback showing final score
      setShowFeedback(true);
    }
  }

  function handleRestart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowFeedback(false);
  }

  const finished = index === total - 1 && showFeedback;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Spot the Narcissistic Behavior
        </h1>
        <p className="text-muted-foreground mb-8">
          Read each scenario and choose the best answer. Then, learn why.
        </p>

        {/* Progress */}
        <div className="mb-6">
          <Progress current={index} total={total} />
        </div>

        {/* Scenario Card */}
        <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-5">
          <h2 className="text-lg md:text-xl font-semibold">{current.title}</h2>
          <p className="text-sm md:text-base">{current.scene}</p>

          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="font-medium">{current.question}</p>
          </div>

          {/* Options */}
          <div className="grid gap-2">
            {current.options.map((opt, i) => {
              const isChosen = selected === i;
              const isCorrect = i === current.correctIndex;
              const showColors = showFeedback && isChosen;
              const correctColor =
                showFeedback && isCorrect && isChosen ? "bg-green-100 border-green-400" : "";
              const wrongColor =
                showFeedback && !isCorrect && isChosen ? "bg-red-100 border-red-400" : "";
              const base =
                "text-left border px-4 py-2 rounded-md transition-colors";

              return (
                <button
                  key={i}
                  onClick={() => handlePick(i)}
                  disabled={showFeedback} // lock after selection until "Next"
                  className={[
                    base,
                    isChosen ? "ring-1 ring-primary" : "hover:bg-muted/40",
                    correctColor,
                    wrongColor,
                  ].join(" ")}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="rounded-xl border p-4 text-sm bg-muted/30">
              <p className="font-medium mb-1">
                {selected === current.correctIndex ? "Correct ✅" : "Not quite ❌"}
              </p>
              <p className="text-muted-foreground">{current.explanation}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">
              Score: {score} / {total}
            </span>

            {!finished ? (
              <button
                onClick={handleNext}
                disabled={!showFeedback}
                className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
              >
                {index + 1 < total ? "Next" : "Finish"}
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90"
              >
                Restart Quiz
              </button>
            )}
          </div>
        </div>

        {/* Final message */}
        {finished && (
          <div className="mt-6 rounded-xl border p-5 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Great work!</h3>
            <p className="text-sm text-muted-foreground">
              The more you practice, the faster you’ll recognize patterns like
              attention redirection, minimizing others, and taking undue credit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
