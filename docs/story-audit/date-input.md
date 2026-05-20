# Date Input Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/date-input/date-input.stories.ts`
- Angular examples: `packages/angular/src/date-input/examples/`
- Angular styles: `packages/angular/src/date-input/date-input-example-styles.ts`
- React story: `packages/react/src/components/date-input/date-input.stories.tsx`
- React examples: `packages/react/src/components/date-input/examples/`
- React styles: `.storybook/modules/date-input.module.css`, `.storybook/modules/date-picker.module.css`

## Summary

- Status: Fixed the missing Angular `WithDatePicker` story surface.
- Highest-risk gaps: `WithDatePicker` composes date-input, date-picker, date-picker portal, synchronized date value, and
  date-picker calendar grids.

## Story Inventory

| Story name      | React | Angular | Notes                                                                                                                                                   |
| --------------- | ----- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic           | Yes   | Yes     | Story order matches.                                                                                                                                    |
| Controlled      | Yes   | Yes     | Angular uses signal-backed two-way value binding.                                                                                                       |
| DefaultValue    | Yes   | Yes     | Data source differs only by framework binding style.                                                                                                    |
| Disabled        | Yes   | Yes     | Matches story surface.                                                                                                                                  |
| Granularity     | Yes   | Yes     | Matches story surface.                                                                                                                                  |
| Invalid         | Yes   | Yes     | Matches story surface.                                                                                                                                  |
| LeadingZeros    | Yes   | Yes     | Matches story surface.                                                                                                                                  |
| Localized       | Yes   | Yes     | Angular uses `provideArkLocale`; React uses `LocaleProvider`.                                                                                           |
| MinMax          | Yes   | Yes     | Matches story surface.                                                                                                                                  |
| Range           | Yes   | Yes     | Angular includes default range values; React leaves range empty. No change, because it demonstrates both segment groups clearly without adding a story. |
| ReadOnly        | Yes   | Yes     | Matches story surface.                                                                                                                                  |
| RootProvider    | Yes   | Yes     | Matches root-provider composition.                                                                                                                      |
| RTL             | Yes   | Yes     | Angular uses locale provider and inherited RTL locale direction instead of explicit `dir="rtl"`.                                                        |
| WithClearButton | Yes   | Yes     | Matches story surface.                                                                                                                                  |
| WithDatePicker  | Yes   | Yes     | Added Angular example and story export.                                                                                                                 |

## Example Data Sources

| Example         | Data origin                                        | Shape                                            | Dynamic/async                                                                        | Divergence                                                                                                                                      |
| --------------- | -------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic           | None                                               | Empty date input value                           | None                                                                                 | None.                                                                                                                                           |
| Controlled      | `parseDate` and component state                    | `DateValue[]` with one item                      | User edits update state                                                              | Angular used `2026-05-19`; React uses `2024-06-15`. Deferred as existing component story data difference outside the focused missing story fix. |
| DefaultValue    | `parseDate('2024-06-15')`                          | One `DateValue` in an array                      | None                                                                                 | None.                                                                                                                                           |
| Disabled        | `parseDate('2024-06-15')`                          | One `DateValue` in an array                      | None                                                                                 | None.                                                                                                                                           |
| Granularity     | Root prop                                          | `granularity="second"`                           | None                                                                                 | None.                                                                                                                                           |
| Invalid         | Root prop                                          | Invalid empty date input                         | None                                                                                 | None.                                                                                                                                           |
| LeadingZeros    | `parseDate('2024-06-05')` plus local boolean state | One `DateValue`; checkbox boolean                | Checkbox toggles `shouldForceLeadingZeros`                                           | None.                                                                                                                                           |
| Localized       | Locale provider                                    | French locale, minute granularity, 24-hour cycle | None                                                                                 | Framework-specific locale provider.                                                                                                             |
| MinMax          | `parseDate` constants                              | Min and max `DateValue`                          | None                                                                                 | None.                                                                                                                                           |
| Range           | Root prop and date values                          | `selectionMode="range"` with two segment groups  | None                                                                                 | Angular pre-populates range; React does not. No change in this pass.                                                                            |
| ReadOnly        | `parseDate('2024-06-15')`                          | One `DateValue` in an array                      | None                                                                                 | None.                                                                                                                                           |
| RootProvider    | `useDateInput`                                     | Date input machine API                           | User edits machine state                                                             | Angular uses `runInInjectionContext`; React calls hook directly.                                                                                |
| RTL             | Locale provider                                    | Arabic locale, empty value                       | None                                                                                 | Angular relies on locale `dir`; React passes `dir="rtl"`.                                                                                       |
| WithClearButton | `useDateInput`                                     | Date input machine API                           | Button calls `clearValue`                                                            | None.                                                                                                                                           |
| WithDatePicker  | `useDateInput` + `useDatePicker`                   | Date input value mirrors date picker value       | Date input changes call `datePicker.setValue`; picker selection updates shared value | Fixed in Angular.                                                                                                                               |

## Sections / Structure

- Meta differences: React title is `Components/ Date Input`; Angular title is `Components / Date Input`. Existing
  Angular spacing follows nearby Angular stories and is unchanged.
- Decorator differences: Angular uses per-story `moduleMetadata` imports and render templates; React re-exports examples
  directly.
- Per-story decorators / args / controls: Neither story defines args, argTypes, controls, tags, or custom parameters.
  Each Angular story imports exactly its standalone example.

## Styling

| Element                          | React selector / class                                        | Angular selector / class                                   | Gap                                                        | Fix                                                  |
| -------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| Date input root                  | `.Root`                                                       | `[data-scope='date-input'][data-part='root']`              | Existing match.                                            | No change.                                           |
| Date input label                 | `.Label`                                                      | `[data-scope='date-input'][data-part='label']`             | Existing match.                                            | No change.                                           |
| Date input control               | `.Control`                                                    | `[data-scope='date-input'][data-part='control']`           | Existing match.                                            | No change.                                           |
| Segment group                    | `.SegmentGroup`                                               | `[data-scope='date-input'][data-part='segment-group']`     | Existing match.                                            | No change.                                           |
| Segment                          | `.Segment`                                                    | `[data-scope='date-input'][data-part='segment']`           | Existing match.                                            | No change.                                           |
| Date picker root/control/trigger | `.Root`, `.Control`, `.Trigger` from `date-picker.module.css` | Missing date-picker selectors in date-input example styles | Missing styles for added composed story.                   | Add date-picker selectors to date-input demo styles. |
| Date picker content/views/table  | `.Content`, `.View`, `.ViewControl`, `.Table*`                | Missing date-picker selectors in date-input example styles | Missing popover calendar styling for added composed story. | Add relevant date-picker selectors and animations.   |

## Gap Matrix

| Area                | Gap                                                    | React reference                                                          | Angular location                                               | Fix                                                                                                         |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Story inventory     | Missing `WithDatePicker` export                        | `packages/react/src/components/date-input/date-input.stories.tsx`        | `packages/angular/src/date-input/date-input.stories.ts`        | Add Angular story export after `WithClearButton`.                                                           |
| Example composition | Missing date-input/date-picker combined example        | `packages/react/src/components/date-input/examples/with-date-picker.tsx` | `packages/angular/src/date-input/examples/with-date-picker.ts` | Add standalone Angular example using `useDateInput`, `useDatePicker`, date-picker portal, and shared value. |
| Icons               | Missing calendar and chevron icons for composed picker | `lucide-react` icons in React example                                    | `packages/angular/src/date-input/examples/icons.ts`            | Add Angular SVG icon components.                                                                            |
| Styling             | Missing date-picker CSS in Date Input demo surface     | `.storybook/modules/date-picker.module.css`                              | `packages/angular/src/date-input/date-input-example-styles.ts` | Translate needed date-picker module styles to data-part selectors.                                          |

## Implementation Plan

1. Create the parity audit file and record the missing story.
2. Add `DateInputCalendarIcon`, `DateInputChevronLeftIcon`, and `DateInputChevronRightIcon`.
3. Add the Angular `WithDatePicker` standalone example using date-input and date-picker root providers.
4. Add date-picker demo styles to `date-input-example-styles.ts`.
5. Import and export the new story in `date-input.stories.ts`.
6. Run focused test, typecheck, Storybook startup, formatting/whitespace checks, and update this audit.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6014 --ci` passed startup/build with exit
      code 0.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed in this pass.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/date-input/date-input.spec.ts` passed, 1 file /
      15 tests.
- [ ] Typecheck: `bun run --cwd packages/angular typecheck` failed on unrelated
      `combobox/examples/highlight-matching-text.ts(2,39): Cannot find module '@ark-ui/angular/highlight'`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/date-input/date-input.stories.ts     packages/angular/src/date-input/examples/with-date-picker.ts packages/angular/src/date-input/examples/icons.ts     packages/angular/src/date-input/date-input-example-styles.ts docs/story-audit/date-input.md`
      passed.
- [x] Whitespace: `git diff --check` passed. Date-input-scoped `git diff --check -- ...` passed. Ignored audit doc
      whitespace check produced no whitespace warnings. New `with-date-picker.ts` no-index whitespace check produced no
      whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align date-input story with react parity`
