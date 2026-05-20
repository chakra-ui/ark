# Radio Group Angular Parity Audit

## Scope
- Angular files: `packages/angular/radio-group/`
- React files: `packages/react/src/components/radio-group/`
- Storybook/style files: `packages/react/src/components/radio-group/radio-group.stories.tsx`, `.storybook/modules/radio-group.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/utilities.css`, `packages/angular/radio-group/radio-group.stories.ts`, `packages/angular/radio-group/radio-group-example-styles.ts`

## Summary
- Status: Mostly aligned. Angular exposes the same root, root-provider, label, indicator, item, item-control, item-text, hidden-input, context, item-context, hook, anatomy, and Zag type surface expected for the directive-centric Angular package. Runtime selection, disabled handling, fieldset propagation, CVA integration, and examples already pass the narrow component suite.
- Highest-risk gaps: Storybook demo CSS diverges for shared layout utilities and the root-provider button; Angular has an unused empty `examples/icons.ts` with no React counterpart; Angular tests cover behavior and forms but did not explicitly assert the rendered radio-group a11y attributes.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Angular `valueChange` is the `model()` channel value, while React `onValueChange` receives `{ value }`. | `packages/react/src/components/radio-group/radio-group-root.tsx` | `packages/angular/radio-group/radio-group-root.ts` | No change. Angular technical requirements reserve `valueChange` for the `model()` channel and prohibit a duplicate output with the same name. |
| Behavior | A11y attributes are provided by Zag but were not directly covered in Angular tests. Native arrow-key movement is delegated to browser radio-input behavior, which jsdom does not reliably simulate. | `packages/react/src/components/radio-group/tests/radio-group.test.tsx`, `node_modules/.bun/@zag-js+radio-group@1.40.0/node_modules/@zag-js/radio-group/dist/radio-group.connect.mjs` | `packages/angular/radio-group/radio-group.spec.ts` | Add narrow Angular assertions for role, label wiring, required/invalid state, hidden radio inputs, names, values, and checked state. |
| Stories/examples | Angular contains an unused empty `icons.ts` example with no React story or example counterpart. | `packages/react/src/components/radio-group/examples/` | `packages/angular/radio-group/examples/icons.ts` | Delete the empty unused file. |
| Styling | Local `.stack`, `.hstack`, and `.button` demo styles do not match the React Storybook utility/button CSS used by `Orientation` and `RootProvider`. | `.storybook/modules/utilities.css`, `.storybook/modules/button.module.css` | `packages/angular/radio-group/radio-group-example-styles.ts` | Align the Angular example styles with the React utility/button values. |
| Exports/package wiring | Radio group secondary entry point is already present in package exports, Vite aliases, anatomy aggregation, and entrypoint specs. | React `index.ts` and package entrypoint | `packages/angular/package.json`, `packages/angular/vite.config.ts`, `packages/angular/src/anatomy.ts`, `packages/angular/src/entrypoints.spec.ts` | No shared-file change required. |

## Implementation Plan
1. Update `packages/angular/radio-group/radio-group-example-styles.ts` so `.stack`, `.hstack`, and `.button` match the React Storybook utility/button modules.
2. Remove the unused empty `packages/angular/radio-group/examples/icons.ts`.
3. Add focused Angular spec coverage for radio-group a11y attributes rendered through Zag.
4. Run the radio-group spec, Angular typecheck, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. This ran TypeScript checks, Angular package build, and forms-isolation checks.
- [x] Component tests: `bun run --cwd packages/angular test:ci radio-group/radio-group.spec.ts` passed with 16 tests.
- [ ] Storybook render: Not run; narrow verification used typecheck/build plus radio-group specs.
- [x] Manual/visual checks: Compared React CSS modules and Angular example styles textually; fixed `.stack`, `.hstack`, and `.button` drift.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
