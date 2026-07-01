# AGENTS.md — NumeraTutor ITS

## Stack
- Next.js 14.2 App Router, React 18, TypeScript 5, Tailwind CSS 3
- **100% client-side** — no API routes, no database, no auth
- All persistence via `localStorage` keys: `proficiencyData`, `completedNodes`, `unlockedNodes`, `reviewSchedule`
- Path alias `@/*` → project root

## Commands
| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | `next lint` (only lint tool available) |

No formatter or test framework. To typecheck: `npx tsc --noEmit`.

## Routes
- `/` → redirects to `/dashboard`
- `/dashboard` — knowledge map, study plan, pending reviews, weak nodes
- `/questoes` — adaptive practice (60 questions across 12 nodes)
- `/exame/[id]` — module exam (40 exam questions total)
- `/tutoria/[id]?node=[nodeId]` — content reader with sidebar

## Architecture
- **`lib/`**: `domain.ts` (types + static module data), `domain-content.ts` (HTML strings), `domain-questions.ts` (questions pool)
- **`hooks/`**: `useProficiency` (Bayesian score + IRT theta), `useNodeProgress` (completion/unlock), `useSpacedRepetition` (SM-2), `useStudyPlan` (plan generation + error classification)
- **`components/`**: `Tutoring/index.tsx` (content player), `layout/AppHeader.tsx`, `ui/*` (cards, hints, toast, progress circle)
- **`app/`**: Pages use App Router with `"use client"` directives
- Content rendered via `dangerouslySetInnerHTML` in Tutoring component

## Key Conventions
- Language: Brazilian Portuguese (pt-BR)
- Dark theme: base `bg-[#0F172A]`, cards `bg-[#1E293B]`
- Utility classes: `.card`, `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`, `.input-field` defined in `globals.css`
- 4 modules × 3 nodes = 12 knowledge nodes
- Proficiency threshold: 80% = mastery, 60% = exam eligibility
- Unlock flow: reach 80% proficiency in `/questoes` → node auto-completes → next node unlocked automatically; complete module → unlock first node of next module
- Exam pass: 70%, bonus unlock at 80%

## Quirks & Gotchas
- **Hydration pattern**: All hooks expose a `hydrated` boolean. Components must check it before reading data (e.g. `if (!hydrated) return <Loading...>`) to avoid SSR mismatch.
- **Next.js 14.2 Promise params**: `tutoria/[id]/page.tsx` uses `async` page with `await params` and `await searchParams` — they are Promises, not plain objects.
- `useProficiency` caches score in state at `recordAttempt` time; `getProficiency` reads from closure, not localStorage directly
- `useNodeProgress.completeNode` reads `completedNodes`/`unlockedNodes` from closure — rapid calls can cause stale state (mitigated by gating with `!isCompleted`)
- Error classification `distracao` checks numeric difference ≤ 2; non-numeric answers always fall through to `conceitual`
- SM-2 applied per question attempt (not aggregated per session)
- Confusion detection only triggers on incorrect answers
- No test suite exists — manual browser testing + DevTools → localStorage inspection
- Clearing localStorage loses all progress
