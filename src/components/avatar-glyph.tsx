'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

export function AvatarGlyph({ className }: { className?: string }) {
  const [party, setParty] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setParty((value) => !value)}
      aria-pressed={party}
      aria-label={party ? 'party mode: on' : 'party mode: off'}
      className={cn(
        'group relative isolate grid place-items-center rounded-full transition-transform duration-300 ease-out hover:scale-105 active:scale-95',
        className,
      )}
    >
      <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r="55"
          className="fill-accent stroke-on-accent/20 transition-colors duration-300"
          strokeWidth="2"
        />

        <g
          className={cn(
            'origin-center transition-all duration-300',
            party ? 'scale-90 opacity-0' : 'scale-100 opacity-100',
          )}
        >
          <rect
            x="26"
            y="46"
            width="28"
            height="20"
            rx="5"
            className="fill-bg/40 stroke-on-accent"
            strokeWidth="4"
          />
          <rect
            x="66"
            y="46"
            width="28"
            height="20"
            rx="5"
            className="fill-bg/40 stroke-on-accent"
            strokeWidth="4"
          />
          <line
            x1="54"
            y1="54"
            x2="66"
            y2="54"
            className="stroke-on-accent"
            strokeWidth="4"
          />
          <path
            d="M46 84 Q60 92 74 84"
            className="stroke-on-accent fill-none"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        <g
          className={cn(
            'origin-center transition-all duration-300',
            party ? 'scale-100 opacity-100' : 'scale-110 opacity-0',
          )}
        >
          <path
            d="M42 34 L60 6 L70 32"
            className="fill-primary stroke-on-accent"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="8" r="4" className="fill-on-accent" />
          <path
            d="M32 52 Q40 44 48 52"
            className="stroke-on-accent fill-none"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M72 52 Q80 44 88 52"
            className="stroke-on-accent fill-none"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M42 76 Q60 96 78 76"
            className="fill-bg/70 stroke-on-accent"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="30" r="3" className="fill-primary" />
          <circle cx="98" cy="26" r="3" className="fill-on-accent" />
          <circle cx="102" cy="82" r="3" className="fill-primary" />
        </g>
      </svg>
    </button>
  );
}
