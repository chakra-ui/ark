# Rating Group Angular Parity Audit

## Scope
- Angular files: `packages/angular/rating-group/`
- React files: `packages/react/src/components/rating-group/`
- Storybook/style files: `packages/react/src/components/rating-group/rating-group.stories.tsx`, `packages/angular/rating-group/rating-group.stories.ts`, `.storybook/modules/rating-group.module.css`, `packages/angular/rating-group/rating-group-example-styles.ts`

## Summary
- Status: Near parity. Angular exposes the same Root, RootProvider, Label, Control, Context, Item, ItemContext, HiddenInput, anatomy, hook, and context helpers with Angular-idiomatic directives and signals.
- Highest-risk gaps: Angular specs did not cover several React-tested guarantees for controlled hidden input precedence, field-derived hidden input attributes, label-click focus behavior, and field error visibility. Story inventory and demo styling are already aligned.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Tests | Controlled `value` precedence over `defaultValue` was covered in React tests but not directly asserted against the Angular hidden input. | `packages/react/src/components/rating-group/tests/rating-group.test.tsx` `should apply value` | `packages/angular/rating-group/rating-group.spec.ts` | Add focused spec for `[value]` + `[defaultValue]` hidden input value. |
| Tests / field integration | React tests assert required, disabled, readOnly, helper/error text, and label-click focus through `Field.Root`; Angular only rendered the field example. | `packages/react/src/components/rating-group/tests/rating-group.test.tsx` `Rating Group / Field` | `packages/angular/rating-group/rating-group.spec.ts` | Add Angular field integration specs covering hidden input attributes, error visibility, and label focus. |
| API | React has `onValueChange(details)` while Angular uses `value = model<number | undefined>()` and its generated `(valueChange)` scalar event for two-way binding. | `packages/react/src/components/rating-group/rating-group-root.tsx` | `packages/angular/rating-group/rating-group-root.ts` | No change. This follows the Angular package model-channel requirement and preserves `[(value)]`. |
| API | React supports polymorphic `asChild`; Angular exposes directive selectors on consumer-chosen host elements. | React factory components under `packages/react/src/components/rating-group/` | Angular directives under `packages/angular/rating-group/` | No change. Directive host composition is the Angular equivalent. |
| Styling | React CSS modules and Angular example styles match root, label, control, item, indicator, half-star, disabled, readonly, and focus-visible selectors. | `.storybook/modules/rating-group.module.css` | `packages/angular/rating-group/rating-group-example-styles.ts` | No change. |
| Shared exports | Rating group already has a package export, anatomy root export, and entrypoint spec coverage. | `packages/react/src/components/rating-group/index.ts` | `packages/angular/package.json`, `packages/angular/src/anatomy.ts`, `packages/angular/src/entrypoints.spec.ts` | No shared edits required. |

## Implementation Plan
1. Add narrow Angular specs for the React-tested behavior gaps.
2. Run the rating-group spec and typecheck if the spec changes expose type issues.
3. Update verification results in this audit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. Existing ng-packagr export-condition warnings were emitted.
- [x] Component tests: `bun run --cwd packages/angular test:ci rating-group/rating-group.spec.ts` passed, 18 tests.
- [ ] Storybook render: Not run; no story/example code changed.
- [x] Manual/visual checks: Static comparison confirmed Angular story inventory, examples, and example styles match the React reference.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
