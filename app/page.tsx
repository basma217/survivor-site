"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Quote, Shield, Anchor, ArrowRight, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { stories } from "@/lib/storiesData";

/** Section (scoped to this page) */
const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="py-14 md:py-20">
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3 text-primary">
          <Sparkles className="w-7 h-7" /> {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-base md:text-lg">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm shadow-sm">
    {children}
  </span>
);

const QuoteBlock = ({ text }: { text: string }) => (
  <blockquote className="relative rounded-2xl border p-5 md:p-6 shadow-sm bg-background">
    <Quote className="absolute -top-4 -left-4 w-9 h-9 opacity-20" />
    <p className="text-base md:text-lg leading-relaxed">{text}</p>
  </blockquote>
);

export default function SurvivorSite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/20 to-primary-hover/30 text-foreground">
      {/* Skip link for a11y */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-background border rounded px-3 py-2">
        Skip to content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <span className="font-semibold text-primary">Healing After Narcissists</span>
          </div>

          {/* hash links are fine as <a> */}
          <nav className="hidden md:flex items-center gap-4 text-sm" aria-label="Primary">
            <a href="#stories" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">Real Stories</a>
            <a href="#youre-not-crazy" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">You’re Not Crazy</a>
            <a href="#mnemonics" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">Mnemonics</a>
            <a href="#resources" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">Resources</a>
            {/* real route -> use Link */}
            <Link href="/quiz" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">
              Quiz
            </Link>
          </nav>

          {/* real route in a button */}
          <Button className="ml-4" asChild>
            <Link href="/quiz" aria-label="Start the quiz">Start Quiz</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-14 md:pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Survivors aren’t crazy. <span className="text-primary">You were manipulated.</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Raw, validating stories and practical guidance for anyone recovering from narcissistic abuse. You’re not alone—and healing is possible.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge><Shield className="w-4 h-4" /> Validation first</Badge>
              <Badge><Anchor className="w-4 h-4" /> Grounded guidance</Badge>
              <Badge><Users className="w-4 h-4" /> Community-centered</Badge>
            </div>

            <div className="mt-6 flex gap-3">
              <Button asChild>
                <a href="#stories" className="inline-flex items-center gap-2">
                  Read Stories <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#youre-not-crazy">Reality Check</a>
              </Button>
              {/* prominent quiz CTA */}
              <Button variant="secondary" asChild>
                <Link href="/quiz">Take the Quiz</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Extra quiz CTA (kept, now inside container) */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-8 flex gap-4">
          <Link
            href="/quiz"
            className="px-5 py-3 rounded-md text-lg font-extrabold bg-pink-600 text-white hover:bg-pink-700"
          >
            Spot the Narcissistic Behavior Quiz
          </Link>
        </div>
      </div>

      <main id="main">
        {/* Real Stories */}
        <Section
          id="stories"
          title="Real Stories (Anonymous or Not)"
          subtitle="Survivors want to feel less alone. Raw, unfiltered stories = validation."
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            className="grid md:grid-cols-3 gap-6"
          >
            {stories.map((story, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              >
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-primary">{story.title}</h3>
                    <QuoteBlock text={story.text} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* You’re Not Crazy */}
        <Section
          id="youre-not-crazy"
          title="You’re Not Crazy: How Narcissists Warp Your Reality"
          subtitle="If you feel confused after every disagreement, that’s not a flaw — it’s a tactic used on you."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">The Gaslighting Cycle</h3>
                <ol className="list-decimal ml-5 space-y-2 text-sm md:text-base">
                  <li><strong>They deny your reality.</strong> “That’s not what I said.” Even if you heard it clearly.</li>
                  <li><strong>They rewrite the past.</strong> “I never promised that.” Even when there’s proof.</li>
                  <li><strong>They minimize your feelings.</strong> “You’re too sensitive.” As if your pain is an overreaction.</li>
                  <li><strong>They flip the blame onto you.</strong> “If you hadn’t done that, I wouldn’t be upset.” You end up apologizing for their behavior.</li>
                </ol>
                <QuoteBlock text="Healthy relationships don’t require you to constantly question your sanity. They allow you to feel safe, respected, and believed." />
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">Why it works</h3>
                <ul className="grid gap-2 text-sm md:text-base">
                  <li>• You start to <strong>doubt your memory</strong>.</li>
                  <li>• You become <strong>dependent on them</strong> to define reality.</li>
                  <li>• You feel <strong>trapped</strong>, afraid to speak up or trust your gut.</li>
                </ul>
                <div className="rounded-xl border p-4 text-sm bg-muted/40">
                  <p className="font-medium">Truth bomb for survivors:</p>
                  <p>If you’ve been told you’re “too sensitive,” “crazy,” or “making things up” — that’s not proof you’re broken. It’s proof you’ve been manipulated.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Mnemonics */}
        <Section id="mnemonics" title="Mnemonic — C.L.A.R.I.T.Y." subtitle="A quick way to reality-check and protect your mind.">
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="text-left">
                  <th className="py-2 pr-3">Letter</th>
                  <th className="py-2 pr-3">Stands for</th>
                  <th className="py-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="py-2 pr-3 font-medium">C</td><td className="py-2 pr-3">Confirm your memories</td><td className="py-2">Keep a journal or screenshots</td></tr>
                <tr className="border-t"><td className="py-2 pr-3 font-medium">L</td><td className="py-2 pr-3">Listen to your gut</td><td className="py-2">Intuition is rarely wrong</td></tr>
                <tr className="border-t"><td className="py-2 pr-3 font-medium">A</td><td className="py-2 pr-3">Avoid arguing reality</td><td className="py-2">You won’t win against gaslighting</td></tr>
                <tr className="border-t"><td className="py-2 pr-3 font-medium">R</td><td className="py-2 pr-3">Reach out to allies</td><td className="py-2">Friends can reality-check</td></tr>
                <tr className="border-t"><td className="py-2 pr-3 font-medium">I</td><td className="py-2 pr-3">Identify patterns</td><td className="py-2">Spot repeated tactics</td></tr>
                <tr className="border-t"><td className="py-2 pr-3 font-medium">T</td><td className="py-2 pr-3">Trust yourself again</td><td className="py-2">Rebuild inner confidence</td></tr>
                <tr className="border-t"><td className="py-2 pr-3 font-medium">Y</td><td className="py-2 pr-3">Your reality matters</td><td className="py-2">It is valid and worth defending</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Resources */}
        <Section id="resources" title="You’re Not Alone" subtitle="Information-only support options and safety notes.">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-primary">Practical next steps</h3>
                <ul className="grid gap-2 text-sm md:text-base">
                  <li>• Document incidents (dates, quotes, outcomes) to counter gaslighting.</li>
                  <li>• Share with a trusted friend for perspective and safety.</li>
                  <li>• Consider trauma-informed therapy for education and skills (information only; not medical advice).</li>
                  <li>• If you feel unsafe, explore local hotlines and legal options in your region.</li>
                </ul>
                <div className="text-xs text-muted-foreground">
                  This site is educational and not a substitute for personalized medical, legal, or safety advice.
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-primary">Share your story</h3>
                <p className="text-sm md:text-base">
                  Your voice can help someone find clarity. Submit an anonymous story (change names and details for safety) and we may feature it.
                </p>
                <div className="flex gap-3">
                  <Button asChild>
                    <a href="#stories">Read more stories</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#submit">Submit yours</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t py-10 mt-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Healing After Narcissists — Educational content only. No tailored medical advice.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#stories" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">Stories</a>
            <a href="#youre-not-crazy" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">Reality Check</a>
            <a href="#resources" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">Resources</a>
            <Link href="/quiz" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">Quiz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
