import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, CheckCircledIcon } from '@radix-ui/react-icons';

function HeroIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="relative h-auto w-full rounded-lg border border-slate-700/70 bg-slate-900/70 shadow-2xl shadow-black/30"
      viewBox="0 0 720 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="720" height="480" rx="8" fill="#0F172A" />
      <path
        d="M0 116C96 66 191 49 286 65C379 80 437 133 520 129C592 125 647 82 720 42V480H0V116Z"
        fill="#122033"
      />
      <circle cx="596" cy="96" r="74" fill="#14B8A6" fillOpacity="0.12" />
      <circle cx="126" cy="382" r="92" fill="#FBBF24" fillOpacity="0.08" />

      <g filter="url(#paperShadow)">
        <rect x="102" y="91" width="292" height="338" rx="18" fill="#F8FAFC" />
        <rect
          x="102"
          y="91"
          width="292"
          height="338"
          rx="18"
          stroke="#CBD5E1"
        />
        <rect x="137" y="130" width="92" height="16" rx="8" fill="#14B8A6" />
        <rect x="137" y="170" width="206" height="9" rx="4.5" fill="#CBD5E1" />
        <rect x="137" y="194" width="176" height="9" rx="4.5" fill="#CBD5E1" />
        <rect x="137" y="218" width="212" height="9" rx="4.5" fill="#CBD5E1" />
        <rect x="137" y="258" width="154" height="9" rx="4.5" fill="#CBD5E1" />
        <rect x="137" y="282" width="210" height="9" rx="4.5" fill="#CBD5E1" />
        <rect x="137" y="306" width="186" height="9" rx="4.5" fill="#CBD5E1" />
        <rect x="137" y="362" width="100" height="28" rx="14" fill="#ECFEFF" />
        <text
          x="154"
          y="381"
          fill="#0F766E"
          fontFamily="Arial, sans-serif"
          fontSize="14"
          fontWeight="700"
        >
          IELTS
        </text>
      </g>

      <g filter="url(#panelShadow)">
        <rect x="366" y="120" width="236" height="222" rx="18" fill="#101827" />
        <rect
          x="366"
          y="120"
          width="236"
          height="222"
          rx="18"
          stroke="#334155"
        />
        <path
          d="M408 181H560M408 221H512M408 261H540"
          stroke="#64748B"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect x="408" y="149" width="106" height="18" rx="9" fill="#2DD4BF" />
        <path
          d="M531 154L543 166L568 140"
          stroke="#FDE68A"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g filter="url(#scoreShadow)">
        <rect x="457" y="306" width="168" height="88" rx="18" fill="#172554" />
        <rect
          x="457"
          y="306"
          width="168"
          height="88"
          rx="18"
          stroke="#38BDF8"
        />
        <text
          x="485"
          y="354"
          fill="#E0F2FE"
          fontFamily="Arial, sans-serif"
          fontSize="18"
          fontWeight="700"
        >
          Band
        </text>
        <text
          x="548"
          y="365"
          fill="#5EEAD4"
          fontFamily="Arial, sans-serif"
          fontSize="44"
          fontWeight="800"
        >
          7+
        </text>
      </g>

      <g stroke="#5EEAD4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M472 88V66M472 88L454 106M472 88L490 106" strokeWidth="6" />
        <path d="M544 74V52M544 74L526 92M544 74L562 92" strokeWidth="6" />
        <path
          d="M612 140V118M612 140L594 158M612 140L630 158"
          strokeWidth="6"
        />
      </g>

      <g filter="url(#chipShadow)">
        <rect x="74" y="58" width="84" height="42" rx="21" fill="#134E4A" />
        <circle cx="101" cy="79" r="8" fill="#5EEAD4" />
        <path d="M121 68V90M132 68V90" stroke="#CCFBF1" strokeWidth="5" />
      </g>

      <defs>
        <filter
          id="paperShadow"
          x="78"
          y="75"
          width="340"
          height="386"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="14"
            floodColor="#020617"
            floodOpacity="0.36"
          />
        </filter>
        <filter
          id="panelShadow"
          x="342"
          y="104"
          width="284"
          height="270"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="14"
            floodColor="#020617"
            floodOpacity="0.4"
          />
        </filter>
        <filter
          id="scoreShadow"
          x="433"
          y="290"
          width="216"
          height="136"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="12"
            floodColor="#020617"
            floodOpacity="0.38"
          />
        </filter>
        <filter
          id="chipShadow"
          x="54"
          y="44"
          width="124"
          height="82"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="10"
            floodColor="#020617"
            floodOpacity="0.32"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="grid min-h-[calc(100vh-9rem)] items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
      <div className="flex max-w-2xl flex-col">
        <div>
          <p className="mb-4 inline-flex w-fit items-center rounded-lg border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-sm font-semibold text-teal-200">
            IELTS Writing Task 1 and Task 2
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Improve your IELTS Writing with focused AI feedback
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Generate model answers, compare your draft against IELTS criteria,
            and turn vague practice into a clearer next step.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/improve" className="button--primary">
            Improve an answer <ArrowRightIcon />
          </Link>
          <Link href="/write" className="button--secondary">
            Generate a sample
          </Link>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
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
