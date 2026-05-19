# Focus Trap Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/focus-trap/focus-trap.ts`, `packages/angular/src/focus-trap/focus-trap.spec.ts`, `packages/angular/src/focus-trap/focus-trap.stories.ts`, `packages/angular/src/focus-trap/examples/basic.ts`, `packages/angular/src/focus-trap/examples/initial-focus.ts`, `packages/angular/src/focus-trap/examples/autofocus.ts`, `packages/angular/src/focus-trap/public-api.ts`, `packages/angular/src/focus-trap/ng-package.json`
- React files: `packages/react/src/components/focus-trap/focus-trap.tsx`, `packages/react/src/components/focus-trap/focus-trap.stories.tsx`, `packages/react/src/components/focus-trap/examples/basic.tsx`, `packages/react/src/components/focus-trap/examples/initial-focus.tsx`, `packages/react/src/components/focus-trap/examples/autofocus.tsx`, `packages/react/src/components/focus-trap/index.ts`
- Storybook/style files: no `.storybook/modules/focus-trap.module.css`; both frameworks use local inline/component styles for the three focus-trap examples.

## Summary
- Status: Fixed, with Storybook startup blocked by an unrelated `src/highlight/highlight.ts` type import error.
- Highest-risk gaps: Angular activated `trapFocus` without an SSR/browser guard, the directive was missing an `exportAs` handle expected for root-like Angular parts, and Angular examples added a `max-width` not present in the React demos.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Angular exposes a directive-centric API with `[arkFocusTrap]` plus `[arkFocusTrapOptions]` instead of a React component with individual trap props. | `packages/react/src/components/focus-trap/focus-trap.tsx` | `packages/angular/src/focus-trap/focus-trap.ts` | No change. This is the expected Angular shape for a behavior-only primitive: the selector activates the host directive and options remain typed as Zag `TrapFocusOptions`. |
| Public API parity | Directive lacked an `exportAs` name for template-reference access, unlike the package's root directive convention. | `FocusTrap.displayName = 'FocusTrap'` in `packages/react/src/components/focus-trap/focus-trap.tsx`; Angular technical requirements root directive convention | `packages/angular/src/focus-trap/focus-trap.ts` | Add `exportAs: 'arkFocusTrap'`. |
| Functionality/SSR | `trapFocus` is DOM-only and could be invoked during server rendering. | React uses `useSafeLayoutEffect`, so activation happens after browser layout effects. | `packages/angular/src/focus-trap/focus-trap.ts` | Guard activation with Angular platform detection. |
| Story parity | Story names match: `Basic`, `InitialFocus`, `Autofocus`. | `packages/react/src/components/focus-trap/focus-trap.stories.tsx` | `packages/angular/src/focus-trap/focus-trap.stories.ts` | No change. |
| Styling parity | Angular demos add `max-width: 320px`, which is not present in the React inline demo styles. | `packages/react/src/components/focus-trap/examples/basic.tsx`, `initial-focus.tsx`, `autofocus.tsx` | `packages/angular/src/focus-trap/examples/basic.ts`, `initial-focus.ts`, `autofocus.ts` | Remove the extra max-width. |
| Accessibility parity | Focus trap behavior, initial focus, autofocus, return focus, textarea/input/button paths are represented. | React examples under `packages/react/src/components/focus-trap/examples/` | Angular examples under `packages/angular/src/focus-trap/examples/` | No change beyond SSR hardening. |
| Test parity | Existing Angular tests cover activation, deactivation, destroy cleanup, option forwarding, and option-identity reactivation. Missing coverage for SSR guard and `exportAs`. | React has no component-local test file for focus-trap. | `packages/angular/src/focus-trap/focus-trap.spec.ts` | Add focused tests. |

## Implementation Plan
1. Add `exportAs: 'arkFocusTrap'` to the directive metadata.
2. Guard focus-trap activation so `trapFocus` only runs in browser platform contexts.
3. Add specs for the template export and SSR no-op behavior.
4. Remove extra `max-width` styling from the Angular focus-trap examples.
5. Run focused component tests, Angular typecheck, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; this ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `ng build @ark-ui/angular --configuration=production`, and `scripts/check-forms-isolation.ts`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/focus-trap/focus-trap.spec.ts` passed with 10 tests.
- [ ] Storybook render: `bun run --cwd packages/angular storybook` reached preview compilation but failed on unrelated `src/highlight/highlight.ts:4:24 - error TS2305: Module '"@angular/common"' has no exported member 'NgClassSupportedTypes'.`
- [x] Manual/visual checks: Compared React and Angular `Basic`, `InitialFocus`, and `Autofocus` example source; removed the Angular-only `.trap` `max-width` so the local demo layout rules match React's display, direction, gap, and padding.

## Commit
- Hash: Reported in final response.
- Message: `fix(angular): align focus-trap with react parity`
