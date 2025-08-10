"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Quote, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { stories } from "@/lib/storiesData";

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
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
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

const QuoteBlock = ({ text }: { text: string }) => (
  <blockquote className="relative rounded-2xl border p-5 md:p-6 shadow-sm bg-background">
    <Quote className="absolute -top-4 -left-4 w-9 h-9 opacity-20" />
    <p className="text-base md:text-lg leading-relaxed">{text}</p>
  </blockquote>
);

export default function SurvivorSite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <span className="font-semibold">Healing After Narcissists</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a href="#stories" className="hover:underline">Real Stories</a>
            <a href="#youre-not-crazy" className="hover:underline">You’re Not Crazy</a>
            <a href="#mnemonics" className="hover:underline">Mnemonics</a>
            <a href="#resources" className="hover:underline">Resources</a>
          </nav>
          <Button asChild className="ml-4">
            <a href="#resources">Get Support</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 py-20 grid gap-8 items-center md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Survivors aren’t crazy. <span className="text-primary">You were manipulated.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Raw, validating stories and practical guidance for anyone recovering from narcissistic abuse. You’re not alone—and healing is possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
              <Button asChild>
                <a href="/quiz">Start the Quiz</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/traits">Traits</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="h-64 rounded-3xl bg-gradient-to-tr from-primary/20 to-muted/20" />
          </div>
        </motion.div>
      </section>

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
                  <h3 className="text-xl font-semibold">{story.title}</h3>
                  <QuoteBlock text={story.text} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  );
}
