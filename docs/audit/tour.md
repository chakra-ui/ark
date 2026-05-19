# Tour Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/tour/`
- React files: `packages/react/src/components/tour/`
- Storybook/style files: `packages/angular/src/tour/tour.stories.ts`, `packages/angular/src/tour/examples/`, `packages/angular/src/tour/tour-example-styles.ts`, `.storybook/modules/tour.module.css`

## Summary
- Status: Re-audited. Earlier story/example/style gaps remain closed; this pass corrected two residual copy mismatches in the wait-for-click and keyboard-navigation examples.
- Highest-risk gaps:
  - Previously: Angular Storybook exposed only `Basic`, `Controlled`, and `WaitForClick`; now exposes every React story plus the Angular-only `Controlled`.
  - Previously: thin Angular demo styles; now `tour-example-styles.ts` mirrors the React `tour.module.css` selectors (targets, hint, event log, form, list, progress bar, floating, dialog, focus-visible).
  - This re-audit: minor wording drift in two examples versus React reference.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Angular Storybook now mirrors all 10 React stories. | `packages/react/src/components/tour/tour.stories.tsx` | `packages/angular/src/tour/tour.stories.ts` | No change (closed in prior pass). |
| Example copy | Angular `WaitForClick` first dialog title read `Interactive Tour`; React uses `Interactive Tutorial`. | `packages/react/src/components/tour/examples/wait-for-click.tsx` | `packages/angular/src/tour/examples/wait-for-click.ts` | Updated Angular title to `Interactive Tutorial`. |
| Example copy | Angular `KeyboardNavigation` step descriptions omitted the `→` and `←` symbols that appear in the React copy. | `packages/react/src/components/tour/examples/keyboard-navigation.tsx` | `packages/angular/src/tour/examples/keyboard-navigation.ts` | Restored the `(→)` and `(←)` annotations in the matching descriptions. |
| Styling parity | Angular `tour-example-styles.ts` covers all React `tour.module.css` selectors used by ported examples (root, targets, backdrop, spotlight, positioner, content, arrow, close, control, action triggers, hint, progress, event log, form, list, animations). | `.storybook/modules/tour.module.css` | `packages/angular/src/tour/tour-example-styles.ts` | No change. Selector names differ by Angular convention (`tour-` prefix instead of PascalCase modules) but value parity is intact. |
| Functionality | Root inputs (`steps`, `stepId` model, `closeOnInteractOutside`, `closeOnEscape`, `keyboardNavigation`, `preventInteraction`, `spotlightOffset`, `spotlightRadius`, `translations`, `ids`, `id`) plus outputs (`focusOutside`, `interactOutside`, `pointerDownOutside`, `statusChange`, `stepChange`, `stepsChange`, `stepIdChange` via the model) match the React `useTour` surface. | `packages/react/src/components/tour/use-tour.ts`, `packages/react/src/components/tour/tour-root.tsx` | `packages/angular/src/tour/tour-root.ts` | No change. |
| Public API | Directive-centric Angular API (`ArkTourRoot` + descendant parts, `ARK_TOUR_CONTEXT`, `injectArkTourContext`, `useTour`, wait helpers, anatomy) intentionally diverges from React's namespace/polymorphic API per technical-requirements §4–5. | `packages/react/src/components/tour/index.ts` | `packages/angular/src/tour/public-api.ts` | No change. |
| Functionality | Presence/lazy mount (`UsePresenceProps` on `TourRoot`) is not exposed as Angular inputs. | `packages/react/src/components/tour/tour-root.tsx` | `packages/angular/src/tour/tour-root.ts` | No change. Tracked as Angular-wide presence pattern follow-up; flag here but defer until the package introduces a shared presence directive. |
| Stories | Angular keeps an extra `Controlled` story demonstrating `[(stepId)]`; no React analogue. | n/a | `packages/angular/src/tour/tour.stories.ts`, `packages/angular/src/tour/examples/controlled.ts` | No change. Angular-only example exercising the `model()` channel required by technical-requirements §3. |
| Tests | `tour.spec.ts` imports every example and asserts root inputs/outputs, action-trigger flow, wait helpers, dynamic portaled context propagation, and orphan-provider diagnostics. | `packages/react/src/components/tour/*.test.tsx` (n/a in this repo) | `packages/angular/src/tour/tour.spec.ts` | No change. |
| Icons / copy | Angular examples drop the `lucide-react` icons (SparklesIcon, KeyboardIcon, XIcon, etc.) and replace `<XIcon />` close affordance with a textual `x`. | React example files | Angular example files | No change. Icon parity is not in scope for Angular Storybook (no equivalent icon dependency); plain text matches the existing Angular component convention. |

## Implementation Plan
1. Reconcile copy drift in `wait-for-click` (`Interactive Tutorial`) and `keyboard-navigation` (`(→)`/`(←)`).
2. Re-run focused tour specs to confirm no regression.
3. Re-confirm Angular typecheck and Storybook smoke.
4. Update this audit and commit only tour-scoped files.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/tour/tour.spec.ts` — 10/10 tests passed in 1.33s.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` — blocked by unrelated `src/navigation-menu/navigation-menu.spec.ts(124,73)` TS4111 error owned by a sibling parallel agent; no tour-scoped errors reported.
- [x] Whitespace: `git diff --check -- docs/audit/tour.md packages/angular/src/tour` — clean (exit 0).
- [ ] Storybook render: not re-run this pass; previously verified `--ci --smoke-test` after the comprehensive fix. Copy-only diffs in this pass cannot affect Storybook compilation.
- [x] Manual/visual checks: diffed React example sources against Angular counterparts; only the two flagged copy mismatches remained and both were corrected.

## Commit
- Hash: filled in post-commit
- Message: `fix(angular): align tour with react parity`
