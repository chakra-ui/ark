# Tour Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/tour/`
- React files: `packages/react/src/components/tour/`
- Storybook/style files: `packages/angular/src/tour/tour.stories.ts`, `packages/angular/src/tour/examples/`, `packages/angular/src/tour/tour-example-styles.ts`, `.storybook/modules/tour.module.css`

## Summary
- Status: Fixed with one unrelated verification blocker noted.
- Highest-risk gaps:
  - Angular Storybook exposed only `Basic`, `Controlled`, and `WaitForClick`; React exposes `Basic`, `AsyncStep`, `Events`, `KeyboardNavigation`, `MixedTypes`, `SkipTour`, `WaitForClick`, `WaitForElement`, `WaitForInput`, and `ProgressBar`.
  - Angular examples did not exercise several public tour behaviors already supported by the implementation: async step updates, event callbacks, keyboard navigation, mixed dialog/tooltip/floating steps, dynamic element waiting, input predicates, progress percentage, spotlight, and arrow parts.
  - Angular demo styles were much thinner than the React `tour.module.css`, missing focused action styling, event log, form, list, progress-bar, floating/dialog width, arrow, spotlight, and focus-visible selectors.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing seven React stories and demos. | `packages/react/src/components/tour/tour.stories.tsx` | `packages/angular/src/tour/tour.stories.ts` | Add Angular `AsyncStep`, `Events`, `KeyboardNavigation`, `MixedTypes`, `SkipTour`, `WaitForElement`, `WaitForInput`, and `ProgressBar` stories. |
| Story parity | Angular `Basic` covered only three tooltip steps and did not render arrow/spotlight parts. | `packages/react/src/components/tour/examples/basic.tsx` | `packages/angular/src/tour/examples/basic.ts` | Align the basic scenario with React's welcome/upload/save/more/complete flow and render backdrop, spotlight, arrow, and close/progress/content parts through a portal. |
| Story parity | Angular `WaitForClick` covered a single wait target instead of React's add/edit/delete sequence. | `packages/react/src/components/tour/examples/wait-for-click.tsx` | `packages/angular/src/tour/examples/wait-for-click.ts` | Align the wait-for-click scenario with the multi-step React flow. |
| Styling parity | Angular example CSS lacked most React tour demo states and helper selectors. | `.storybook/modules/tour.module.css` | `packages/angular/src/tour/tour-example-styles.ts` | Expand Angular demo styles to cover React-equivalent content, action buttons, targets, hint, progress, event log, form, list, arrow, focus, and floating/dialog variants. |
| Test parity | Story/example smoke test only covered the three existing Angular examples. | `packages/react/src/components/tour/tour.stories.tsx` | `packages/angular/src/tour/tour.spec.ts` | Import and assert all new Angular tour examples so the Storybook surface compiles under the component spec. |
| Public API | Root inputs, outputs, parts, context helpers, anatomy, and wait helpers are present. | `packages/react/src/components/tour/index.ts`, `packages/react/src/components/tour/tour.ts`, `packages/react/src/components/tour/*.tsx` | `packages/angular/src/tour/public-api.ts`, `packages/angular/src/tour/tour-root.ts`, `packages/angular/src/tour/*.ts` | No change. Angular directive-centric API intentionally differs from React's namespace/polymorphic API per technical requirements. |
| Functionality | Presence/lazy mount APIs from React root are not exposed as Angular inputs. | `packages/react/src/components/tour/tour-root.tsx` | `packages/angular/src/tour/tour-root.ts` | No change. Angular currently keeps tour parts mounted and uses Zag state/attributes; this is an implementation model difference to revisit only if a package-wide Angular presence pattern is added. |

## Implementation Plan
1. Add the missing Angular tour examples for the React Storybook scenarios.
2. Align existing `Basic` and `WaitForClick` examples with the React scenarios and render all relevant tour parts.
3. Expand Angular example styles to cover the React tour demo selectors and states.
4. Register the missing stories and update the tour spec smoke imports/assertions.
5. Run focused tour specs, Angular typecheck, and `git diff --check`; record results here.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by unrelated `src/tree-view/tree-view.spec.ts(709,47)` type incompatibility in active tree-view work before build/forms checks ran.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/tour/tour.spec.ts` passed, 10 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --ci --smoke-test` passed; emitted existing unused-compilation and `process.env.NODE_ENV` warnings.
- [x] Manual/visual checks: compared Angular tour example templates/styles against React `Basic`, `AsyncStep`, `Events`, `KeyboardNavigation`, `MixedTypes`, `SkipTour`, `WaitForClick`, `WaitForElement`, `WaitForInput`, and `ProgressBar` references. Browser-level visual inspection was not run beyond Storybook smoke startup.
- [x] Whitespace: `git diff --check -- docs/audit/tour.md packages/angular/src/tour` passed.

## Commit
- Hash: Reported in final status after commit.
- Message: `fix(angular): align tour with react parity`
