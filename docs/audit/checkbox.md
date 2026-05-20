# Checkbox Angular Parity Audit

## Scope
- Angular files: `packages/angular/checkbox/*`, `packages/angular/checkbox/examples/*`, `packages/angular/checkbox/checkbox.spec.ts`
- React files: `packages/react/src/components/checkbox/*`, `packages/react/src/components/checkbox/examples/*`, `packages/react/src/components/checkbox/tests/*`
- Storybook/style files: `packages/angular/checkbox/checkbox.stories.ts`, `packages/angular/checkbox/checkbox-example-styles.ts`, `.storybook/modules/checkbox.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/fieldset.module.css`

## Summary
- Status: Mostly aligned. Angular exposes the same root, descendant parts, provider helpers, group helper, context template, Zag-backed checked states, group selection, max-selected behavior, field/fieldset integration, and form examples.
- Highest-risk gaps: Angular Storybook button styling is less complete than the React `button.module.css` reference, and Angular tests do not cover the React field/read-only/a11y association parity cases.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| API | Root, parts, root/group providers, context, hooks, anatomy, and Zag types are present with Angular directive names and signal/model channels. | `packages/react/src/components/checkbox/index.ts`, `checkbox.ts` | `packages/angular/checkbox/public-api.ts` | No change. Angular naming is directive-centric by design. |
| Behavior | Checked/defaultChecked/disabled/group/maxSelectedValues/form CVA behavior is implemented and covered. | `packages/react/src/components/checkbox/use-checkbox.ts`, `use-checkbox-group.ts` | `packages/angular/checkbox/use-checkbox.ts`, `use-checkbox-group.ts`, `checkbox-root.ts` | No change. |
| A11y | Hidden input receives Zag props and field `aria-describedby`; root/control/label props are applied by part directives. | `checkbox-hidden-input.tsx`, `checkbox-root.tsx`, `checkbox-control.tsx` | `checkbox-hidden-input.ts`, `checkbox-root.ts`, `checkbox-control.ts` | No change. |
| Tests | Angular lacks focused coverage for React parity cases where field context marks the checkbox required/disabled/read-only and label/input association enables accessible naming. | `packages/react/src/components/checkbox/tests/checkbox.test.tsx` | `packages/angular/checkbox/checkbox.spec.ts` | Add narrow Angular specs for field context propagation and label/input association. |
| Stories | Story exports match React. | `packages/react/src/components/checkbox/checkbox.stories.tsx` | `packages/angular/checkbox/checkbox.stories.ts` | No change. |
| Styling | Checkbox part styling matches the React checkbox module. Demo button styling used by checkbox form/root-provider examples misses React button hover/focus/disabled/solid hover states. | `.storybook/modules/checkbox.module.css`, `.storybook/modules/button.module.css` | `packages/angular/checkbox/checkbox-example-styles.ts` | Extend `.checkbox-demo-button` styles in the checkbox example styles. |
| Shared styling | `WithField` uses shared field styles; Angular shared `fieldExampleStyles` lacks the React `[data-inline] { width: auto }` rule. | `.storybook/modules/field.module.css` | `packages/angular/field/field-example-styles.ts` | Deferred/report only. This is outside Worker B's allowed checkbox-only edit scope. |

## Implementation Plan
1. Add Angular specs that mirror React's checkbox/field required, disabled, read-only, and label/input association expectations.
2. Update checkbox-local demo button styles to match React button hover/focus/disabled/solid variant states.
3. Run the checkbox spec and `git diff --check`.

## Verification
- [ ] Typecheck/build: Not run; no public API or package wiring changes.
- [x] Component tests: `bun run --cwd packages/angular test:ci checkbox/checkbox.spec.ts` passed (32 tests).
- [ ] Storybook render: Not run; story surface is verified by source comparison and example render specs.
- [x] Manual/visual checks: Source-level comparison against React CSS modules completed; no browser visual pass.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
