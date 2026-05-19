# Presence Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/presence/presence.ts`, `packages/angular/src/presence/presence.spec.ts`, `packages/angular/src/presence/presence.stories.ts`, `packages/angular/src/presence/examples/*.ts`, `packages/angular/src/presence/presence-example-styles.ts`, `packages/angular/src/presence/public-api.ts`
- React files: `packages/react/src/components/presence/presence.tsx`, `packages/react/src/components/presence/use-presence.ts`, `packages/react/src/components/presence/use-presence-context.ts`, `packages/react/src/components/presence/split-presence-props.ts`, `packages/react/src/components/presence/presence.test.tsx`, `packages/react/src/components/presence/presence.stories.tsx`, `packages/react/src/components/presence/examples/*.tsx`
- Storybook/style files: `.storybook/modules/presence.module.css`, `packages/angular/src/presence/presence-example-styles.ts`

## Summary
- Status: Re-audited. Previous parity fixes (`immediate` input, no-motion auto-exit, shared example styles) still in place. One residual story-classification mismatch found and fixed: Angular story sat under `Utilities / Presence` while React lives under `Components / Presence`.
- Highest-risk gaps:
  - None remaining; React `PresenceProvider`/`usePresenceContext` carry no public surface in Angular because descendant parts use DI in the directive-centric model.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story classification | Angular story was titled `Utilities / Presence`; React groups it under `Components / Presence`. | `packages/react/src/components/presence/presence.stories.tsx` (`title: 'Components / Presence'`). | `packages/angular/src/presence/presence.stories.ts`. | Retitle Angular meta to `Components / Presence`. |
| Public API parity | React exports `PresenceProvider`, `usePresenceContext`, `UsePresenceContext`, `splitPresenceProps`, and `usePresence`. | `packages/react/src/components/presence/index.ts`. | `packages/angular/src/presence/public-api.ts`. | No change. Angular's directive-centric model resolves presence context through DI (`inject(ArkPresenceComponent)`); no hook-style provider is needed and technical requirements forbid hook ports. |
| Public API parity | `immediate` input present on both. | `packages/react/src/components/presence/split-presence-props.ts`. | `packages/angular/src/presence/presence.ts`. | No change. Already implemented as `input(false, { transform: booleanAttribute })`. |
| Story names | Story names, args, and example IDs match. | `packages/react/src/components/presence/presence.stories.tsx`. | `packages/angular/src/presence/presence.stories.ts`. | No change. |
| Functionality parity | `unmountOnExit` completes automatically when no exit motion is active. | `@zag-js/presence` machine auto-unmounts on the next frame when no animation is active. | `packages/angular/src/presence/presence.ts` (`scheduleNoMotionExitCompletion`). | No change. Confirmed by the dedicated `completes unmountOnExit automatically when no exit motion is active` spec. |
| Functionality parity | `skipAnimationOnMount` suppresses initial `data-state="open"` and restores it on later enters. | `packages/react/src/components/presence/use-presence.ts`. | `packages/angular/src/presence/presence.ts` (`skipInitialOpenState`). | No change. Confirmed by two dedicated specs. |
| Styling parity | Angular demos use the React Box dimensions, neutral background, and `data-state` fade/scale animations via `::ng-deep` targeting the rendered span. | `.storybook/modules/presence.module.css`. | `packages/angular/src/presence/presence-example-styles.ts`. | No change. |
| Accessibility parity | Presence emits no roles or ARIA itself; toggle remains a native button. | `packages/react/src/components/presence/presence.test.tsx` (axe). | `packages/angular/src/presence/examples/*.ts`. | No change. |
| Test parity | Angular covers all four React lifecycle scenarios (lazy/no-lazy × unmount/keep) and adds no-motion auto-unmount, `immediate` attribute mapping, origin-injector retention, and skipAnimationOnMount re-entry. | `packages/react/src/components/presence/presence.test.tsx`. | `packages/angular/src/presence/presence.spec.ts`. | No change. |

## Implementation Plan
1. Retitle Angular Storybook meta from `Utilities / Presence` to `Components / Presence` so it appears in the same sidebar bucket as the React reference.
2. Re-run the focused presence spec to confirm no regression.
3. Update this audit and commit only Angular presence files plus this audit.

## Verification
- [x] Typecheck/build: Re-audit did not change exported types; not re-run for this iteration. Prior run noted `pin-input` blocking package typecheck on an unrelated index-signature error; presence itself remains green.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/presence/presence.spec.ts` — 1 file / 16 tests pass.
- [ ] Storybook render: not re-run in this iteration; only the meta `title` string changed, which Storybook reads at module load and exercises no Angular code paths.
- [x] Manual/visual checks: Compared React `presence.stories.tsx` title against Angular meta; confirmed they now share `Components / Presence`. Example markup and styles unchanged from the previous parity pass.

## Commit
- Hash: b18f62c43
- Message: `fix(angular): align presence with react parity`
