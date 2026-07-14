'use client';

import { useEffect, useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type NavLabels = {
  cases: string;
  stack: string;
  blog: string;
  contact: string;
};

const sections = ['provas', 'arsenal', 'blog', 'contato'] as const;
type SectionId = (typeof sections)[number];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const visible = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }

        let top: SectionId | null = null;
        let best = 0;
        for (const [id, ratio] of visible) {
          if (ratio > best) {
            best = ratio;
            top = id;
          }
        }
        setActive(top);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const id of sections) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

function NavItem({
  href,
  label,
  active,
  emphasis = false,
}: {
  href: string;
  label: string;
  active: boolean;
  emphasis?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'text-small relative py-1 font-medium transition-colors',
        emphasis
          ? 'text-primary hover:text-primary-strong font-semibold'
          : active
            ? 'text-ink'
            : 'text-muted hover:text-ink',
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          'bg-accent absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-full transition-transform duration-300 ease-out',
          active ? 'scale-x-100' : 'scale-x-0',
        )}
      />
    </Link>
  );
}

export function NavLinks({ labels }: { labels: NavLabels }) {
  const pathname = usePathname();
  const onBlogRoute = pathname.startsWith('/blog');
  const activeSection = useActiveSection(!onBlogRoute);

  return (
    <>
      <NavItem
        href="/#provas"
        label={labels.cases}
        active={activeSection === 'provas'}
      />
      <NavItem
        href="/#arsenal"
        label={labels.stack}
        active={activeSection === 'arsenal'}
      />
      <NavItem
        href="/blog"
        label={labels.blog}
        active={onBlogRoute || activeSection === 'blog'}
      />
      <NavItem
        href="/#contato"
        label={labels.contact}
        active={activeSection === 'contato'}
        emphasis
      />
    </>
  );
}
