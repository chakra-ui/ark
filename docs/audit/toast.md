# Toast Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/toast/*`, `packages/angular/src/toast/examples/*`, `packages/angular/src/toast/toast.stories.ts`
- React files: `packages/react/src/components/toast/*`, `packages/react/src/components/toast/examples/*`, `packages/react/src/components/toast/tests/*`
- Storybook/style files: `.storybook/modules/toast.module.css`, `packages/angular/src/toast/toast-example-styles.ts`

## Summary
- Status: Fixed and verified.
- Highest-risk gaps: Angular Storybook omitted React's `Types`, `PromiseToast`, and `VaryingHeight` stories, and Angular demo CSS did not exercise the React reference's type-specific colors, indicators, close/action trigger placement, or stack animation variables.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `Types` story for success/error/warning/info helpers. | `packages/react/src/components/toast/examples/types.tsx`, `packages/react/src/components/toast/toast.stories.tsx` | `packages/angular/src/toast/toast.stories.ts` | Add Angular `types` example and story export. |
| Story parity | Missing `PromiseToast` story for `toaster.promise`. | `packages/react/src/components/toast/examples/promise-toast.tsx`, `packages/react/src/components/toast/toast.stories.tsx` | `packages/angular/src/toast/toast.stories.ts` | Add Angular promise example and story export. |
| Story parity | Missing `VaryingHeight` story for stacked toasts with different body lengths. | `packages/react/src/components/toast/examples/varying-height.tsx`, `packages/react/src/components/toast/toast.stories.tsx` | `packages/angular/src/toast/toast.stories.ts` | Add Angular varying-height example and story export. |
| Styling parity | Angular demo style used a simple bordered card and footer layout, missing React reference animation variables, type fill colors, indicators, absolute close trigger, action trigger styling, and placement-specific shadow. | `.storybook/modules/toast.module.css` | `packages/angular/src/toast/toast-example-styles.ts` | Replace shared Angular toast example CSS with selectors and class hooks matching the React module while keeping Angular demo button styling. |
| Example parity | Existing Angular examples used simpler titles/copy and did not pass React store options such as `overlap` and `gap`. | `packages/react/src/components/toast/examples/*.tsx` | `packages/angular/src/toast/examples/*.ts` | Align store options, story copy, action labels, duration controls, max-toast controls, and top-end placement copy. |
| Test parity | React has a basic a11y/show-hide test; Angular has broader functional coverage for create/remove, triggers, duration, max, update, context carrier, cleanup, and SSR construction. | `packages/react/src/components/toast/tests/*` | `packages/angular/src/toast/toast.spec.ts` | No change: Angular coverage already exercises the fixed public behavior; visual/story parity is covered through Storybook examples. |
| Public API | Angular exposes directive-centric API and typed store helpers rather than React namespace object names. | `packages/react/src/components/toast/toast.ts`, `packages/react/src/components/toast/index.ts` | `packages/angular/src/toast/public-api.ts`, `packages/angular/src/toast/toast.types.ts` | No change: this follows Angular package technical requirements. |

## Implementation Plan
1. Add Angular toast icons used only by Storybook examples.
2. Add missing `Types`, `PromiseToast`, and `VaryingHeight` examples.
3. Update existing examples to use React-equivalent copy, store options, trigger sets, indicators, and close/action markup.
4. Update `toast.stories.ts` to export every React story.
5. Replace `toast-example-styles.ts` with React-parity selectors adapted for Angular examples.
6. Run focused toast specs, Angular typecheck, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. This ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `ng build @ark-ui/angular --configuration=production`, `scripts/hide-private-entrypoints.ts`, and `scripts/check-forms-isolation.ts`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/toast/toast.spec.ts` passed with 1 file and 10 tests. An initial repo-root filter command (`bun run --cwd packages/angular test:ci packages/angular/src/toast/toast.spec.ts`) found no tests because the test script runs from `packages/angular`.
- [x] Storybook render: `CI=1 bun run --cwd packages/angular storybook -- --port 6016` reached "Storybook ready" at `http://localhost:6016/`; the process was stopped after readiness. An initial default-port attempt stopped at the interactive `6006` unavailable prompt.
- [ ] Manual/visual checks: Not run in browser automation. The Storybook bundle compiled, and visual parity was reviewed from React `.storybook/modules/toast.module.css` against Angular `toast-example-styles.ts`.

## Commit
- Hash: `7a8c742c1`
- Message: `fix(angular): align toast stories with react parity`
