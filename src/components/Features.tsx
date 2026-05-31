import Link from 'next/link';
import type { ComponentType } from 'react';
import {
  ArrowRightIcon,
  MagicWandIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';

interface Feature {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  cta: string;
}

const FEATURES: Feature[] = [
  {
    icon: Pencil2Icon,
    title: 'Write',
    desc: 'Just input the requirement and the assistant will write a sample for you based on the requirements.',
    href: '/write',
    cta: 'Create a sample',
  },
  {
    icon: MagicWandIcon,
    title: 'Improve',
    desc: 'You can write your own answer and the assistant will provide feedback and suggestions to help you improve your score.',
    href: '/improve',
    cta: 'Get feedback',
  },
];

export default function Features() {
  return (
    <section className="pb-12 pt-8">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-amber-200">
            Choose your workflow
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">Practice modes</h2>
        </div>
        <p className="max-w-xl text-slate-400">
          Start from a prompt or bring your own draft. Both modes keep the focus
          on IELTS Writing tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <Link
              href={feature.href}
              key={feature.href}
              className="group flex gap-4 rounded-lg border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-teal-400/60 hover:bg-slate-900"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-teal-200">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="leading-7 text-slate-400">{feature.desc}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                  {feature.cta}
                  <ArrowRightIcon className="transition group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
