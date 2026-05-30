import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import HeroIllustration from '@/components/ui/svg/HeroIllustration';

export default function Hero() {
  return (
    <section className="grid items-center gap-8 py-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-10">
      <div className="flex max-w-2xl flex-col">
        <div>
          <p className="mb-4 inline-flex w-fit items-center rounded-lg border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-sm font-semibold text-teal-200">
            IELTS Writing Task 1 and Task 2
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Improve your IELTS Writing with focused AI feedback
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
            Generate model answers, compare your draft against IELTS criteria,
            and turn vague practice into a clearer next step.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/improve" className="button--primary">
            Improve an answer <ArrowRightIcon />
          </Link>
          <Link href="/write" className="button--secondary">
            Generate a sample
          </Link>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          {[
            'Band-aware feedback',
            'Essay structure help',
            'Image prompts for Task 1',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <CheckCircledIcon className="text-teal-300" /> {item}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute inset-6 rounded-lg bg-amber-300/10 blur-3xl" />
        <HeroIllustration />
      </div>
    </section>
  );
}
