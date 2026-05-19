# Presence Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/presence/presence.ts`, `packages/angular/src/presence/presence.spec.ts`, `packages/angular/src/presence/presence.stories.ts`, `packages/angular/src/presence/examples/*.ts`, `packages/angular/src/presence/public-api.ts`
- React files: `packages/react/src/components/presence/presence.tsx`, `packages/react/src/components/presence/use-presence.ts`, `packages/react/src/components/presence/split-presence-props.ts`, `packages/react/src/components/presence/presence.test.tsx`, `packages/react/src/components/presence/examples/*.tsx`
- Storybook/style files: `.storybook/modules/presence.module.css`, `packages/angular/src/presence/examples/*.ts`

## Summary
- Status: Fixed and verified with focused tests; package-wide typecheck is blocked by an unrelated `pin-input` error.
- Highest-risk gaps:
  - No deferred presence behavior gaps remain from this audit.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | `immediate` is included in Zag/React presence props but is not an Angular input/type field. | `packages/react/src/components/presence/split-presence-props.ts`; `@zag-js/presence` `PresenceProps` | `packages/angular/src/presence/presence.ts` | Add a boolean `immediate` input and include it in `PresenceProps`. |
| Functionality parity | `unmountOnExit` only completes after explicit `animationend`/`transitionend`; no-animation exits never complete. | `packages/react/src/components/presence/use-presence.ts`; `@zag-js/presence` machine auto-unmounts on the next frame when no animation is active. | `packages/angular/src/presence/presence.ts`; `packages/angular/src/presence/presence.spec.ts` | Inspect computed animation/transition duration while exiting and complete automatically when no exit motion is active. |
| Styling parity | Angular demos do not match the React presence box sizing, neutral styling, or `data-state` fade/scale animations. | `.storybook/modules/presence.module.css`; React examples import `styles.Box`. | `packages/angular/src/presence/examples/*.ts` | Add shared Angular presence example styles that target the rendered presence root in each story example. |
| Story parity | Story names and variants match React. | `packages/react/src/components/presence/presence.stories.tsx` | `packages/angular/src/presence/presence.stories.ts` | No change. |
| Accessibility parity | Presence emits no roles or ARIA itself in either framework; button controls remain native buttons. | `packages/react/src/components/presence/presence.test.tsx` | `packages/angular/src/presence/examples/*.ts`; `packages/angular/src/presence/presence.spec.ts` | No change. |
| Test parity | Angular tests cover more lifecycle/injector behavior than React but miss no-motion auto-unmount and `immediate` input mapping. | `packages/react/src/components/presence/presence.test.tsx` | `packages/angular/src/presence/presence.spec.ts`; `packages/angular/src/input-mapping.spec.ts` | Add focused presence spec coverage for no-motion auto-exit and immediate input mapping. |

## Implementation Plan
1. Add `immediate` to the Angular public presence props and component input surface.
2. Add browser-safe exit completion scheduling for no-motion exits while preserving animation/transition event completion.
3. Add Angular specs for no-motion `unmountOnExit` completion and bare `immediate` boolean input mapping.
4. Add a shared Angular presence example stylesheet and update the five presence examples to use React-matching root styling and content.
5. Run focused presence tests, Angular typecheck, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` fails before presence on unrelated `pin-input/pin-input-input.ts(56,16): error TS4111: Property 'autocomplete' comes from an index signature, so it must be accessed with ['autocomplete'].`
- [x] Component tests: `bun run --cwd packages/angular test:ci src/presence/presence.spec.ts` passes, 1 file / 16 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` first prompted because port 6006 was occupied; `bun run --cwd packages/angular storybook -- --port 6007 --ci` started Storybook and Webpack compilation with no presence errors before the bounded 25s run was stopped.
- [x] Manual/visual checks: Compared Angular examples against React `.storybook/modules/presence.module.css`; Angular examples now use the same box dimensions, neutral surface, and open/closed fade-scale animation timings.

## Commit
- Hash: Reported in final task status
- Message: `fix(angular): align presence with react parity`
