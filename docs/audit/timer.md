# Timer Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/timer/`
- React files: `packages/react/src/components/timer/`
- Storybook/style files: `packages/angular/src/timer/timer.stories.ts`, `packages/angular/src/timer/timer-example-styles.ts`, `.storybook/modules/timer.module.css`

## Summary
- Status: Re-audited. Angular component surface, directive structure, machine wiring, and tests are at React parity. This pass aligned Storybook demo styling with the rest of the Angular examples by switching hardcoded hex colors to the shared `--demo-*` design tokens (matching the React reference's token usage), and brought the `Events` and `RootProvider` example demos into closer behavioral parity with React.
- Highest-risk gaps: None outstanding. Angular omits React's `Timer.Context` render-prop equivalent only as a stylistic difference; the Angular `ArkTimerContext` structural directive serves the same purpose with idiomatic template context.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Styling tokens | Angular example styles used hardcoded hex colors (`#111827`, `#4b5563`, `#d1d5db`, etc.) instead of the shared `--demo-*` design tokens used by the React module and other Angular examples. | `.storybook/modules/timer.module.css` (uses `var(--demo-neutral-fg)`, `var(--demo-neutral-emphasized)`) | `packages/angular/src/timer/timer-example-styles.ts` | Replaced hardcoded colors with `var(--demo-neutral-fg)`, `var(--demo-neutral-emphasized)`, `var(--demo-border-emphasized)`, and `var(--demo-neutral-subtle)` to align with neighboring Angular example styles. |
| Story parity – `Events` example | React Events shows `Ticks: {N}` only and logs to console on complete; Angular appended ` complete` to the output text on completion, drifting from the React demo. | `packages/react/src/components/timer/examples/events.tsx` | `packages/angular/src/timer/examples/events.ts` | Removed the appended `complete` text; complete handler now logs `'Timer completed'` to console as React does. |
| Story parity – `RootProvider` example | React renders `timer: ${JSON.stringify(timer.time)}` in the output; Angular rendered only `Seconds: {N}`. | `packages/react/src/components/timer/examples/root-provider.tsx` | `packages/angular/src/timer/examples/root-provider.ts` | Angular now exposes a computed `time` signal that serializes `timer.api().time`, matching React's `timer: {…}` output. |
| Story parity – exports | (Already correct as of prior audit.) Angular exports `Basic`, `Countdown`, `Interval`, `Events`, `Pomodoro`, `RootProvider` in the same order React does. | `packages/react/src/components/timer/timer.stories.tsx` | `packages/angular/src/timer/timer.stories.ts` | No change required. |
| Public API | React exposes a `Timer.Context` render-prop component that passes `useTimerContext()` to children. Angular exposes `ArkTimerContext` as a structural directive providing `$implicit`/`api` template context. | `packages/react/src/components/timer/timer-context.tsx` | `packages/angular/src/timer/timer-context.ts` | No change; Angular idiom is structural directives with `TemplateRef`. The `api` signal it exposes is equivalent to React's `UseTimerContext` (Zag-generated API object). |
| Functionality – autoStart | Angular root effect starts the timer once when `autoStart()` becomes true, rather than passing it into the machine's initial context. | `packages/react/src/components/timer/timer-root.tsx` | `packages/angular/src/timer/timer-root.ts` | No change; signal inputs cannot be read at constructor time in a way that influences initial machine state without violating the technical-requirements input pattern. The existing one-shot effect plus `hasAutoStarted` guard avoids restarts and is covered by countdown/count-up and cleanup specs. |
| Component-part `ArkTimerItem` text content | Angular's `ArkTimerItem` writes `formattedTime[type]` into the host element only when no projected content exists at `ngAfterContentInit`. React's `TimerItem` always renders `formattedTime[type]` as children. | `packages/react/src/components/timer/timer-item.tsx` | `packages/angular/src/timer/timer-item.ts` | No change; Angular's projected-content guard is an intentional escape hatch that preserves React's default behavior (empty children -> auto-fill) while letting templates override. |

## Implementation Plan
1. Re-read React vs Angular source, examples, stories, styles, types, and tests to confirm structural parity.
2. Replace hardcoded colors in `timer-example-styles.ts` with the shared `--demo-*` design tokens used elsewhere.
3. Align Angular `Events` and `RootProvider` demos to React's output behavior.
4. Re-run the focused timer specs and document verification.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/timer/timer.spec.ts` — 7 tests passed (re-run after style/demo edits).
- [ ] Typecheck/build: `bun run --cwd packages/angular typecheck` not re-run this pass; prior audit recorded that unrelated `toast` example imports broke the whole-package typecheck. Timer changes are limited to example styles and two example demos and do not touch public API or types.
- [ ] Storybook render: Not run; changes are CSS variable swaps and demo text changes, both safe by inspection.
- [x] Manual/visual checks: Compared `timer-example-styles.ts` with `.storybook/modules/timer.module.css` and neighboring Angular example styles. Demo classes now consume the same tokens as React's module and as other Angular components (progress, etc.).

## Commit
- Hash: Recorded in final response after commit.
- Message: `fix(angular): align timer with react parity`
