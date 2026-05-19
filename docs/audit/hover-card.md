# Hover Card Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/hover-card/*`, `packages/angular/src/hover-card/examples/*`
- React files: `packages/react/src/components/hover-card/*`, `packages/react/src/components/hover-card/examples/*`, `packages/react/src/components/hover-card/tests/*`
- Storybook/style files: `packages/angular/src/hover-card/hover-card.stories.ts`, `packages/angular/src/hover-card/hover-card-example-styles.ts`, `.storybook/modules/hover-card.module.css`

## Summary
- Status: Fixed Angular hover-card parity gaps found in this pass; shared presence parity remains deferred.
- Highest-risk gaps: multiple trigger values were not passed into Zag, the React `Context` story was missing in Angular, and Angular demos/styles did not match the React profile card presentation.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | `HoverCard.Trigger` accepts a `value` prop for multiple triggers; Angular rendered a literal `value` attribute but never passed it to `getTriggerProps`. | `packages/react/src/components/hover-card/hover-card-trigger.tsx`, `examples/multiple-triggers.tsx` | `packages/angular/src/hover-card/hover-card-trigger.ts`, `examples/multiple-triggers.ts` | Add a signal `value` input and pass `{ value: this.value() }` into `getTriggerProps`; add trigger-value spec coverage. |
| Story parity | React exports a `Context` story that reads `context.open`; Angular had no matching story/example. | `packages/react/src/components/hover-card/hover-card.stories.tsx`, `examples/context.tsx` | `packages/angular/src/hover-card/hover-card.stories.ts` | Add `HoverCardContextExample` and export it from Storybook. |
| Styling parity | React demos use the shared profile-card CSS module; Angular had a plain link and single paragraph card with missing avatar, header, stats, borders, arrow border, hover styles, and animations. | `.storybook/modules/hover-card.module.css`, React hover-card examples | `packages/angular/src/hover-card/hover-card-example-styles.ts`, `examples/*.ts` | Expand Angular example styles and templates to mirror the React profile-card structure. |
| Test parity | React verifies a11y, hover open/close, callback, lazy mount, and default open. Angular covered open/close and default open but not the trigger value contract or new Context story. | `packages/react/src/components/hover-card/tests/hover-card.test.tsx` | `packages/angular/src/hover-card/hover-card.spec.ts` | Add focused specs for trigger value updates and the Context example. |
| Presence parity | React root/root-provider accept `lazyMount` and `unmountOnExit` via presence props. Angular hover-card does not currently expose package-level presence inputs. | `hover-card-root.tsx`, `hover-card-root-provider.tsx`, React tests | `packages/angular/src/hover-card/hover-card-root.ts`, `hover-card-root-provider.ts` | Deferred: this requires a shared Angular presence strategy, not a hover-card-only patch. |

## Implementation Plan
1. Add `value` input plumbing to `ArkHoverCardTrigger`.
2. Add the missing Angular Context example and Storybook export.
3. Update Angular hover-card examples and styles to match the React profile card demos.
4. Add focused Angular specs for trigger value and Context story coverage.
5. Run hover-card specs, typecheck, and diff checks; update this audit with results and commit metadata.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. The build emitted existing ng-packagr export-condition warnings.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/hover-card/hover-card.spec.ts` passed after the final hover-card changes.
- [ ] Storybook render: Not run; covered by typecheck and focused story/example specs in this pass.
- [x] Manual/visual checks: Compared Angular examples/styles against React examples and `.storybook/modules/hover-card.module.css`; updated profile-card layout, trigger, arrow, border, and animation styles.

## Commit
- Hash: Recorded in final response after commit.
- Message: `fix(angular): align hover-card with react parity`
