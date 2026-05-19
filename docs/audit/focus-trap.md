# Focus Trap Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/focus-trap/focus-trap.ts`, `packages/angular/src/focus-trap/focus-trap.spec.ts`, `packages/angular/src/focus-trap/focus-trap.stories.ts`, `packages/angular/src/focus-trap/examples/basic.ts`, `packages/angular/src/focus-trap/examples/initial-focus.ts`, `packages/angular/src/focus-trap/examples/autofocus.ts`, `packages/angular/src/focus-trap/public-api.ts`, `packages/angular/src/focus-trap/ng-package.json`
- React files: `packages/react/src/components/focus-trap/focus-trap.tsx`, `packages/react/src/components/focus-trap/focus-trap.stories.tsx`, `packages/react/src/components/focus-trap/examples/basic.tsx`, `packages/react/src/components/focus-trap/examples/initial-focus.tsx`, `packages/react/src/components/focus-trap/examples/autofocus.tsx`, `packages/react/src/components/focus-trap/index.ts`
- Storybook/style files: no `.storybook/modules/focus-trap.module.css`; both frameworks use local inline/component styles for the three focus-trap examples.

## Summary
- Status: Aligned. Re-audit on 2026-05-19 confirmed all previously closed gaps remain fixed; no new drift detected. Storybook still fails to start because of an unrelated `src/highlight/highlight.ts` type import error.
- Highest-risk gaps: none open. Historical fixes covered SSR guarding, `exportAs` for template references, and removal of an Angular-only `max-width` override on the demo `.trap` block.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Angular exposes a directive-centric API with `[arkFocusTrap]` plus `[arkFocusTrapOptions]` instead of a React component with individual trap props. | `packages/react/src/components/focus-trap/focus-trap.tsx` | `packages/angular/src/focus-trap/focus-trap.ts` | No change. Behavior-only primitive must follow the directive convention from `docs/technical-requirements.md`; options keep the Zag `TrapFocusOptions` shape so all React-equivalent options (`onActivate`, `onDeactivate`, `initialFocus`, `fallbackFocus`, `returnFocusOnDeactivate`, `setReturnFocus`) are reachable. |
| Public API parity | Directive needs an `exportAs` name for template-reference access to match the package's root directive convention. | `FocusTrap.displayName = 'FocusTrap'` in `packages/react/src/components/focus-trap/focus-trap.tsx`; Angular technical requirements root directive convention | `packages/angular/src/focus-trap/focus-trap.ts` | Already applied: `exportAs: 'arkFocusTrap'`. |
| Public API parity | Active flag declared as `input(false, { transform: booleanAttribute })` to accept HTML attribute coercion. | React `disabled` is plain boolean. | `packages/angular/src/focus-trap/focus-trap.ts` | Already applied; matches Angular boolean-input policy in `docs/technical-requirements.md`. |
| Functionality/SSR | `trapFocus` is DOM-only and could be invoked during server rendering. | React uses `useSafeLayoutEffect`, so activation happens after browser layout effects. | `packages/angular/src/focus-trap/focus-trap.ts` | Already applied: activation gated by `isPlatformBrowser(inject(PLATFORM_ID))` inside the reactive `effect`. |
| Functionality parity | Options identity changes must reactivate the trap with new options while the active flag stays true. | React reactivates via `useSafeLayoutEffect` dependency on `trapProps`. | `packages/angular/src/focus-trap/focus-trap.ts` | Already covered: the `effect` reads both `arkFocusTrap()` and `arkFocusTrapOptions()`, tears down, and re-arms when either changes. |
| Story parity | Story names match: `Basic`, `InitialFocus`, `Autofocus`. | `packages/react/src/components/focus-trap/focus-trap.stories.tsx` | `packages/angular/src/focus-trap/focus-trap.stories.ts` | No change. |
| Story parity | Each example mirrors the React flow (toggle start/end button, initial-focus second input, autofocus + setReturnFocus to trigger). | `packages/react/src/components/focus-trap/examples/*.tsx` | `packages/angular/src/focus-trap/examples/*.ts` | No change. |
| Styling parity | Demo `.trap` block uses `display: flex; flex-direction: column; gap: 1rem; padding-block: 1rem;` to mirror React inline styles. | React inline `style` on `<div>` in each example. | `packages/angular/src/focus-trap/examples/*.ts` | Already aligned (Angular-only `max-width` was previously removed). |
| Accessibility parity | Focus trap behavior, initial focus, autofocus, return focus, and textarea/input/button paths are represented. | React examples under `packages/react/src/components/focus-trap/examples/` | Angular examples under `packages/angular/src/focus-trap/examples/` | No change beyond SSR hardening. |
| Test parity | Angular specs cover activation, no-op for falsy values, options forwarding, options-identity reactivation, deactivation toggle, destroy cleanup, `exportAs` template reference, and SSR (`PLATFORM_ID: 'server'`) no-op. | React has no component-local test file for focus-trap. | `packages/angular/src/focus-trap/focus-trap.spec.ts` | No change; coverage exceeds React. |

## Implementation Plan
1. Re-audit pass: confirmed no new drift; no Angular code or story changes required.
2. Refresh the audit file to mark status as Aligned and document the re-audit verification results.
3. Run focused component tests and Angular typecheck/build to lock in verification.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` (re-audit 2026-05-19) ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `ng build @ark-ui/angular --configuration=production`, and `scripts/check-forms-isolation.ts`; all passed.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/focus-trap/focus-trap.spec.ts` (re-audit 2026-05-19) passed with 10 tests.
- [ ] Storybook render: `bun run --cwd packages/angular storybook` still blocked by unrelated `src/highlight/highlight.ts:4:24 - error TS2305: Module '"@angular/common"' has no exported member 'NgClassSupportedTypes'.` Deferred — outside focus-trap scope.
- [x] Manual/visual checks: Compared React and Angular `Basic`, `InitialFocus`, and `Autofocus` example source; flex/gap/padding-block layout matches React inline styles; no Angular-only overrides remain.

## Commit
- Hash: Reported in final response.
- Message: `fix(angular): align focus-trap with react parity`
