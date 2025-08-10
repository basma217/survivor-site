"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Quote, Shield, Anchor, ArrowRight, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Section from "@/components/section";
import { stories } from "@/lib/storiesData";

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
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <span className="font-semibold">Healing After Narcissists</span>
          </div>
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-4 text-sm"
          >
            <a
              href="#stories"
              aria-label="Real Stories"
              className="hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Real Stories
            </a>
            <a
              href="#youre-not-crazy"
              aria-label="You’re Not Crazy"
              className="hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              You’re Not Crazy
            </a>
            <a
              href="#mnemonics"
              aria-label="Mnemonics"
              className="hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Mnemonics
            </a>
            <a
              href="#resources"
              aria-label="Resources"
              className="hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Resources
            </a>
          </nav>
          <Button className="ml-4" asChild>
            <a href="#resources" aria-label="Get Support">
              Get Support
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-14 md:pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                })}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Survivors aren’t crazy.{" "}
              <span className="text-primary">You were manipulated.</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Raw, validating stories and practical guidance for anyone
              recovering from narcissistic abuse. You’re not alone—and healing
              is possible.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>
                <Shield className="w-4 h-4" /> Validation first
              </Badge>
              <Badge>
                <Anchor className="w-4 h-4" /> Grounded guidance
              </Badge>
              <Badge>
                <Users className="w-4 h-4" /> Community-centered
              </Badge>
            </div>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <a
                  href="#stories"
                  aria-label="Read Stories"
                  className="inline-flex items-center gap-2"
                >
                  Read Stories <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#youre-not-crazy" aria-label="Reality Check">
                  Reality Check
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real Stories */}
      <Section
        id="stories"
        title="Real Stories (Anonymous or Not)"
        subtitle="Survivors want to feel less alone. Raw, unfiltered stories = validation."
      >
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          {...(reduceMotion
            ? {}
            : {
                initial: "hidden",
                whileInView: "show",
                viewport: { once: true },
                variants: {
                  hidden: {},
                  show: { transition: { staggerChildren: 0.15 } },
                },
              })}
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              {...(reduceMotion
                ? {}
                : {
                    variants: {
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0 },
                    },
                  })}
            >
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{story.title}</h3>
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
              <h3 className="text-xl font-semibold">The Gaslighting Cycle</h3>
              <ol className="list-decimal ml-5 space-y-2 text-sm md:text-base">
                <li>
                  <strong>They deny your reality.</strong> “That’s not what I
                  said.” Even if you heard it clearly.
                </li>
                <li>
                  <strong>They rewrite the past.</strong> “I never promised
                  that.” Even when there’s proof.
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Resources */}
      <Section
        id="resources"
        title="You’re Not Alone"
        subtitle="Information-only support options and safety notes."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">Practical next steps</h3>
              <ul className="grid gap-2 text-sm md:text-base">
                <li>
                  • Document incidents (dates, quotes, outcomes) to counter
                  gaslighting.
                </li>
                <li>
                  • Share with a trusted friend for perspective and safety.
                </li>
                <li>
                  • Consider trauma-informed therapy for education and skills
                  (information only; not medical advice).
                </li>
                <li>
                  • If you feel unsafe, explore local hotlines and legal options
                  in your region.
                </li>
              </ul>
              <div className="text-xs text-muted-foreground">
                This site is educational and not a substitute for personalized
                medical, legal, or safety advice.
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Share your story</h3>
              <p className="text-sm md:text-base">
                Your voice can help someone find clarity. Submit an anonymous
                story (change names and details for safety) and we may feature
                it.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <a href="#stories" aria-label="Read more stories">
                    Read more stories
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#submit" aria-label="Submit your story">
                    Submit yours
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t py-10 mt-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Healing After Narcissists — Educational
            content only. No tailored medical advice.
          </p>
          <div className="flex gap-4 text-sm">
            <a
              href="#stories"
              aria-label="Stories"
              className="hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Stories
            </a>
            <a
              href="#youre-not-crazy"
              aria-label="Reality Check"
              className="hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Reality Check
            </a>
            <a
              href="#resources"
              aria-label="Resources"
              className="hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Resources
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
