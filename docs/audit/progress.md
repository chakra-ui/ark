# Progress Angular Parity Audit

## Scope
- Angular files: `packages/angular/progress/`
- React files: `packages/react/src/components/progress/`
- Storybook/style files: `packages/angular/progress/progress.stories.ts`, `packages/angular/progress/progress-example-styles.ts`, `.storybook/modules/progress.module.css`, `.storybook/modules/progress-circular.module.css`

## Summary
- Status: Fixed Angular parity gaps for root locale/translations inputs, value-text template access, missing controlled and initial-value stories, and circular demo styling.
- Highest-risk gaps: `arkProgress` previously could not receive `translations` or an explicit `locale`, `useProgress()` did not inherit the Ark locale provider, and Angular Storybook lacked React's controlled/initial-value examples.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root accepts `translations` and `locale`; Angular root only exposed `formatOptions`. | `packages/react/src/components/progress/progress-root.tsx` | `packages/angular/progress/progress-root.ts` | Added `translations` and `locale` signal inputs and forwarded them into the machine context. |
| Public API | `ProgressIntlTranslations` was not exported for Angular consumers. | `packages/angular/node_modules/@zag-js/progress/dist/progress.types.d.ts` | `packages/angular/progress/progress.types.ts`, `packages/angular/progress/public-api.ts` | Re-exported the Zag translation type as `ProgressIntlTranslations`. |
| Functionality | `useProgress()` should inherit the Ark locale provider when no explicit locale is supplied. | `packages/react/src/components/progress/use-progress.ts` | `packages/angular/progress/use-progress.ts` | Added `locale: props.locale ?? locale.locale` to the machine context. |
| Functionality | React `Progress.ValueText` renders `percentAsString` by default; Angular directive only applied props, leaving examples visually empty. | `packages/react/src/components/progress/progress-value-text.tsx` | `packages/angular/progress/progress-value-text.ts`, `packages/angular/progress/examples/**` | Exposed `percentAsString` and `valueAsString` signals from `ArkProgressValueText`, then updated examples to render the percent string. |
| Story parity | Linear and circular `Controlled` stories were missing. | `packages/react/src/components/progress/examples/**/controlled.tsx` | `packages/angular/progress/examples/**`, `packages/angular/progress/progress.stories.ts` | Added Angular controlled examples for linear and circular progress and wired Storybook exports. |
| Story parity | Linear and circular `InitialValue` stories were missing. | `packages/react/src/components/progress/examples/**/initial-value.tsx` | `packages/angular/progress/examples/**`, `packages/angular/progress/progress.stories.ts` | Added Angular initial-value examples and wired Storybook exports. |
| Styling parity | Circular demo used different alignment, size, stroke thickness, transitions, and lacked indeterminate animations. | `.storybook/modules/progress-circular.module.css` | `packages/angular/progress/progress-example-styles.ts` | Matched React circular root alignment, `4rem` size, `0.375rem` thickness, stroke transitions, and indeterminate animations. |
| Story parity | Linear/circular indeterminate examples used controlled `[value]="null"` instead of React's uncontrolled `defaultValue={null}`. | `packages/react/src/components/progress/examples/**/indeterminate.tsx` | `packages/angular/progress/examples/**/indeterminate.ts` | Switched examples to `[defaultValue]="null"`. |

## Implementation Plan
1. Add missing progress root inputs and exported translation type.
2. Forward provider locale through `useProgress()` and explicit root locale through `ArkProgressRoot`.
3. Expose value-text signals and render them in examples.
4. Add missing controlled and initial-value examples for linear and circular stories.
5. Bring circular example styles in line with React and add focused tests.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed.
- [x] Component tests: `bun run --cwd packages/angular test:ci progress/progress.spec.ts` passed.
- [ ] Storybook render: Not run; covered by component example mount tests and typecheck.
- [ ] Manual/visual checks: Not run; styles were compared directly against React CSS modules.

## Commit
- Hash: Pending
- Message: `fix(angular): align progress with react parity`
