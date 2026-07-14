'use client';

import { useEffect, useRef, useState } from 'react';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const CONSOLE_ART = String.raw`
  ____
 |  _ \ ___ _ __   __ _ _ __
 | |_) / _ \ '_ \ / _' | '_ \
 |  _ <  __/ | | | (_| | | | |
 |_| \_\___|_| |_|\__,_|_| |_|

 uptime: 100%. curiosidade: também.
 o código deste site: https://github.com/renanlido
`;

const CONFETTI_COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-ok)',
];

function fireConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:90;overflow:hidden';

  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement('span');
    const size = 6 + Math.random() * 8;
    const left = Math.random() * 100;
    const duration = 2.4 + Math.random() * 1.8;
    const delay = Math.random() * 0.6;
    const rotate = Math.random() * 720 - 360;
    piece.style.cssText = `position:absolute;top:-24px;left:${left}vw;width:${size}px;height:${size * 0.45}px;background:${CONFETTI_COLORS[index % CONFETTI_COLORS.length]};border-radius:2px;transform:rotate(${rotate}deg);animation:confetti-fall ${duration}s ${delay}s cubic-bezier(0.25,1,0.5,1) forwards`;
    container.appendChild(piece);
  }

  if (!document.getElementById('confetti-keyframes')) {
    const style = document.createElement('style');
    style.id = 'confetti-keyframes';
    style.textContent =
      '@keyframes confetti-fall{to{transform:translateY(110vh) rotate(720deg);opacity:0.4}}';
    document.head.appendChild(style);
  }

  document.body.appendChild(container);
  window.setTimeout(() => container.remove(), 5200);
}

export function EasterEggs({
  partyToast,
  awayTitle,
}: {
  partyToast: string;
  awayTitle: string;
}) {
  const [toast, setToast] = useState(false);
  const progress = useRef(0);

  useEffect(() => {
    console.log(
      `%c${CONSOLE_ART}`,
      'color:#7c5cff;font-family:monospace;font-size:12px',
    );
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const expected = KONAMI[progress.current];
      if (event.key.toLowerCase() === expected.toLowerCase()) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          fireConfetti();
          setToast(true);
          window.setTimeout(() => setToast(false), 4200);
        }
      } else {
        progress.current = event.key === KONAMI[0] ? 1 : 0;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const original = document.title;

    function onVisibility() {
      document.title = document.hidden ? awayTitle : original;
    }

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.title = original;
    };
  }, [awayTitle]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4"
    >
      {toast && (
        <p className="bg-primary text-small text-on-primary rounded-full px-5 py-3 font-medium shadow-lg">
          {partyToast}
        </p>
      )}
    </div>
  );
}
