# Date Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/date-input/*`, `packages/angular/src/date-input/examples/*`, `packages/angular/src/date-input/date-input.stories.ts`, `packages/angular/src/date-input/date-input.spec.ts`
- React files: `packages/react/src/components/date-input/*`, `packages/react/src/components/date-input/examples/*`, `packages/react/src/components/date-input/tests/*`
- Storybook/style files: `.storybook/modules/date-input.module.css`, `packages/angular/src/date-input/date-input-example-styles.ts`

## Summary
- Status: Fixed for the single-component Date Input parity gaps. The full React `WithDatePicker` composition remains deferred because it is a cross-component Date Picker integration story rather than Date Input-only work.
- Highest-risk gaps: Closed for placeholder model synchronization, single-component Storybook coverage, range hidden inputs, and Storybook demo styling. Remaining risk is visual parity not being browser-inspected side by side.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `placeholderValue` is a controlled Zag prop but Angular exposes it as one-way `input()`, so machine placeholder changes cannot update a consumer binding. | `packages/react/src/components/date-input/date-input-root.tsx`; Zag `DateInputProps.placeholderValue` / `onPlaceholderChange` | `packages/angular/src/date-input/date-input-root.ts` | Change to `model<DateValue \| undefined>()`, update it from `onPlaceholderChange`, and cover `[(placeholderValue)]` in specs. |
| Stories | Angular only had `Basic`, `Controlled`, `Range`, and `RootProvider`; React also documents default value, disabled, granularity, invalid, leading zeros, localized, min/max, read-only, RTL, clear button, and date-picker composition. | `packages/react/src/components/date-input/date-input.stories.tsx`; `packages/react/src/components/date-input/examples/*` | `packages/angular/src/date-input/date-input.stories.ts`; `packages/angular/src/date-input/examples/*` | Added Angular examples/stories for all single-component states. Deferred `WithDatePicker` as a cross-component composition story. |
| Story styling | Angular styles only cover root/control/group/segment basics and focus color; React includes max width, label states, checkbox styling, focus/invalid/disabled/read-only segment group states, placeholder/literal segment styles, and clear-button layout support. | `.storybook/modules/date-input.module.css` | `packages/angular/src/date-input/date-input-example-styles.ts` | Expand Angular example styles to match React selectors through Zag `data-*` parts and story utility classes. |
| Range functionality | Angular range example renders two segment groups but only one hidden input is absent entirely, so form submission parity for range indexes is not demonstrated. | `packages/react/src/components/date-input/examples/range.tsx`; `packages/react/src/components/date-input/tests/date-input.test.tsx` | `packages/angular/src/date-input/examples/range.ts`; `packages/angular/src/date-input/date-input.spec.ts` | Add indexed hidden inputs to the story and a spec asserting indexed range hidden input values. |
| Story content | Existing Angular controlled/root-provider examples omit labels and hidden inputs that React examples include, reducing a11y and form coverage in Storybook. | `packages/react/src/components/date-input/examples/controlled.tsx`; `packages/react/src/components/date-input/examples/root-provider.tsx` | `packages/angular/src/date-input/examples/controlled.ts`; `packages/angular/src/date-input/examples/root-provider.ts` | Add labels/hidden inputs and root-provider output text. |
| Tests | React covers focus, typing, backspace clearing, disabled/read-only/invalid flags, default values, hidden input value, and range hidden inputs. Angular covers public surface, rendering, controlled value/CVA, placeholder output, and root-provider but misses several state assertions. | `packages/react/src/components/date-input/tests/date-input.test.tsx` | `packages/angular/src/date-input/date-input.spec.ts` | Add narrow Angular tests for placeholder model sync, disabled/read-only/invalid attributes, keyboard editing, clearing, and indexed range hidden inputs. |

## Implementation Plan
1. Update `ArkDateInputRoot.placeholderValue` to a model channel and synchronize it from `onPlaceholderChange`.
2. Add missing Angular examples for the React Date Input story states, plus update existing examples for labels, hidden inputs, output text, and range hidden inputs.
3. Expand `date-input-example-styles.ts` to match the React CSS module behavior through data attributes.
4. Add focused Angular specs for the public API and behavior gaps.
5. Run date-input specs, package typecheck, `git diff --check`, then stage only date-input files and this audit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by unrelated dirty `src/collapsible/collapsible.spec.ts(79,73)` TS4111 before build/check-forms-isolation could run.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/date-input/date-input.spec.ts` passed, 15 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --smoke-test --quiet` passed with existing unused-compilation warnings.
- [x] Manual/visual checks: Compared React `.storybook/modules/date-input.module.css` selectors and Date Input story list against Angular examples/styles. Browser side-by-side inspection was not run.

## Commit
- Hash:
- Message:
