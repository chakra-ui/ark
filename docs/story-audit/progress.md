# Progress Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/progress/progress.stories.ts`
- Angular examples: `packages/angular/progress/examples/linear/*`, `packages/angular/progress/examples/circular/*`
- Angular styles: `packages/angular/progress/progress-example-styles.ts`
- React story: `packages/react/src/components/progress/progress-linear.stories.tsx`,
  `packages/react/src/components/progress/progress-circular.stories.tsx`
- React examples: `packages/react/src/components/progress/examples/linear/*`,
  `packages/react/src/components/progress/examples/circular/*`
- React styles: `.storybook/modules/progress.module.css`, `.storybook/modules/progress-circular.module.css`,
  `.storybook/modules/button.module.css`

## Summary

- Status: Story surface aligned; focused Progress checks passed. Repo-wide Storybook and full `git diff --check` are
  blocked by unrelated `tags-input` edits in the shared workspace.
- Highest-risk gaps: Angular combines React's split linear/circular story files into one story and had
  export-order/story-inventory drift; root-provider button styles were missing states from the shared React button
  module.

## Story Inventory

| Story name             | React                                      | Angular                 | Notes                                                                                                                                                |
| ---------------------- | ------------------------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Linear Basic           | `Basic` in `progress-linear.stories.tsx`   | `LinearBasic`           | Angular prefixes names because one story file contains both progress variants.                                                                       |
| Linear Controlled      | `Controlled`                               | `LinearControlled`      | Same data and controlled value shape.                                                                                                                |
| Linear Indeterminate   | `Indeterminate`                            | `LinearIndeterminate`   | Same `defaultValue: null` state.                                                                                                                     |
| Linear InitialValue    | `InitialValue`                             | `LinearInitialValue`    | Same `defaultValue: 70`.                                                                                                                             |
| Linear MinMax          | `MinMax`                                   | `LinearMinMax`          | Same `defaultValue: 20`, `min: 10`, `max: 30`.                                                                                                       |
| Linear RootProvider    | `RootProvider`                             | `LinearRootProvider`    | Same `useProgress` root-provider demo.                                                                                                               |
| Linear ValueText       | `ValueText`                                | `LinearValueText`       | Same custom value translation copy.                                                                                                                  |
| Linear Vertical        | Not exported from React story              | Unexported              | Angular now matches the public React story surface; the example file remains unexported because React also keeps a vertical example file unexported. |
| Circular Basic         | `Basic` in `progress-circular.stories.tsx` | `CircularBasic`         | Same `defaultValue: 42`.                                                                                                                             |
| Circular Controlled    | `Controlled`                               | `CircularControlled`    | Same controlled value shape.                                                                                                                         |
| Circular Indeterminate | `Indeterminate`                            | `CircularIndeterminate` | Same `defaultValue: null` state.                                                                                                                     |
| Circular InitialValue  | `InitialValue`                             | `CircularInitialValue`  | Same `defaultValue: 42`.                                                                                                                             |
| Circular MinMax        | `MinMax`                                   | `CircularMinMax`        | Same `defaultValue: 20`, `min: 10`, `max: 30`.                                                                                                       |
| Circular RootProvider  | `RootProvider`                             | `CircularRootProvider`  | Same `useProgress` root-provider demo.                                                                                                               |
| Circular WithLabel     | `WithLabel`                                | `CircularWithLabel`     | Same label-bearing circular variant.                                                                                                                 |

## Example Data Sources

| Example                | Data origin           | Shape                                                      | Dynamic/async               | Divergence                                                                                                                         |
| ---------------------- | --------------------- | ---------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Linear Basic           | Hard-coded props      | `defaultValue: 42`                                         | None                        | No change.                                                                                                                         |
| Linear Controlled      | Component state       | <code>number &#124; null</code>, initial `42`              | Event/model driven          | Angular uses <code>signal&lt;number &#124; null &#124; undefined&gt;(42)</code> with `[(value)]`, matching the controlled surface. |
| Linear Indeterminate   | Hard-coded props      | `defaultValue: null`                                       | Indeterminate animation     | No change.                                                                                                                         |
| Linear InitialValue    | Hard-coded props      | `defaultValue: 70`                                         | None                        | No change.                                                                                                                         |
| Linear MinMax          | Hard-coded props      | `defaultValue: 20`, `min: 10`, `max: 30`                   | None                        | No change.                                                                                                                         |
| Linear RootProvider    | `useProgress` helper  | Progress service/API                                       | Button invokes `setToMax()` | Angular calls `progress.api().setToMax()`, matching React's `progress.setToMax()` behavior.                                        |
| Linear ValueText       | Progress translations | `value({ value, max })` returns loading or item count text | None                        | No change; Angular uses `useProgress` root-provider because custom translations are supplied through the service context.          |
| Linear Vertical        | Hard-coded props      | `orientation: vertical`                                    | None                        | React has the example file but does not export it from the story; Angular should also leave it unexported.                         |
| Circular Basic         | Hard-coded props      | `defaultValue: 42`                                         | None                        | No change.                                                                                                                         |
| Circular Controlled    | Component state       | <code>number &#124; null</code>, initial `42`              | Event/model driven          | Angular uses <code>signal&lt;number &#124; null &#124; undefined&gt;(42)</code> with `[(value)]`, matching the controlled surface. |
| Circular Indeterminate | Hard-coded props      | `defaultValue: null`                                       | Spin/range animation        | No change.                                                                                                                         |
| Circular InitialValue  | Hard-coded props      | `defaultValue: 42`                                         | None                        | No change.                                                                                                                         |
| Circular MinMax        | Hard-coded props      | `defaultValue: 20`, `min: 10`, `max: 30`                   | None                        | No change.                                                                                                                         |
| Circular RootProvider  | `useProgress` helper  | Progress service/API                                       | Button invokes `setToMax()` | Angular calls `progress.api().setToMax()`, matching React's `progress.setToMax()` behavior.                                        |
| Circular WithLabel     | Hard-coded props      | `defaultValue: 42` plus label                              | None                        | No change.                                                                                                                         |

## Sections / Structure

- Meta differences: React uses two story files titled `Components / Progress - Linear` and
  `Components / Progress - Circular`; Angular uses one combined `Components / Progress` file with prefixed story export
  names. No file split is made in this focused story-surface pass.
- Decorator differences: React re-exports example components directly. Angular uses `moduleMetadata({ imports: [...] })`
  per standalone example plus a template render for each story.
- Per-story decorators / args / controls: Neither side defines args, controls, tags, parameters, or per-story layout
  decorators beyond Angular's standalone-component imports.

## Styling

| Element                   | React selector / class                                        | Angular selector / class                                              | Gap                                                                                                                                           | Fix                                                                       |
| ------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Linear root               | `.Root` in `progress.module.css`                              | `[arkProgress], [arkProgressRootProvider]`                            | Matches grid, width, gap, and color.                                                                                                          | No change.                                                                |
| Linear label/value text   | `.Label`, `.ValueText`                                        | `[arkProgressLabel]`, `[arkProgressValueText]`                        | Matches text sizing, weight, color, and alignment.                                                                                            | No change.                                                                |
| Linear track/range        | `.Track`, `.Range`                                            | `[arkProgressTrack]`, `[arkProgressRange]`                            | Matches dimensions, colors, rounding, transitions, and indeterminate animation; Angular adds a vertical Y animation for vertical orientation. | No story-visible change after Vertical is unexported.                     |
| Circular root             | `.Root` in `progress-circular.module.css`                     | `[arkProgress], [arkProgressRootProvider]`                            | Matches flex layout and gap.                                                                                                                  | No change.                                                                |
| Circular container/circle | `.CircleContainer`, `.Circle`, `.CircleTrack`, `.CircleRange` | `.progress-circle-container`, `svg[arkProgressCircle]`, `circle[...]` | Matches size, positioning, stroke colors, and animations.                                                                                     | No change.                                                                |
| Root-provider button      | `button.Root` from `button.module.css`                        | `.progress-button`                                                    | Angular omitted shared states for icons, expanded, disabled, and variants.                                                                    | Expand `.progress-button` to match React's shared button styling surface. |

## Gap Matrix

| Area            | Gap                                                                   | React reference                                 | Angular location             | Fix                                                                               |
| --------------- | --------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| Story inventory | `LinearVertical` is exported in Angular but not in React.             | `progress-linear.stories.tsx` omits `Vertical`. | `progress.stories.ts`        | Remove the Angular story export/import while leaving the example file unexported. |
| Story order     | Angular linear/circular order differs from React export order.        | React story exports.                            | `progress.stories.ts`        | Reorder Angular exports within each prefixed group.                               |
| Button styling  | Root-provider button does not fully match shared React button states. | `.storybook/modules/button.module.css`          | `progress-example-styles.ts` | Expand `.progress-button` selectors.                                              |

## Implementation Plan

1. Remove the `LinearVertical` story export and import from `progress.stories.ts`.
2. Reorder linear exports to `Basic`, `Controlled`, `Indeterminate`, `InitialValue`, `MinMax`, `RootProvider`,
   `ValueText`.
3. Reorder circular exports to `Basic`, `Controlled`, `Indeterminate`, `InitialValue`, `MinMax`, `RootProvider`,
   `WithLabel`.
4. Expand `.progress-button` styles to match the shared React button module.
5. Run focused Progress tests, Angular typecheck, Storybook startup, and `git diff --check`.

## Deferred (component-level work)

- None identified.

## Verification

- [ ] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6012 --ci` compiled the preview, then
      failed with `EADDRINUSE: address already in use ::1:6012`; retrying
      `bun run --cwd packages/angular storybook -- --port 6123 --ci` failed on unrelated
      `packages/angular/tags-input/examples/*` syntax errors around `template`/`styles` fields.
- [ ] Visual check of each story: Not performed because Storybook did not reach a usable server state.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci progress/progress.spec.ts` passed, 1 file / 19 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Prettier:
      `bun prettier --check packages/angular/progress/progress.stories.ts packages/angular/progress/progress-example-styles.ts docs/story-audit/progress.md`
      passed after formatting the audit file.
- [x] Progress whitespace:
      `git diff --check -- packages/angular/progress/progress.stories.ts packages/angular/progress/progress-example-styles.ts`
      passed; `git diff --no-index --check /dev/null docs/story-audit/progress.md` produced no whitespace warnings.
- [ ] Repo whitespace: full `git diff --check` failed on unrelated trailing whitespace in
      `packages/angular/tags-input/examples/*`.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align progress story with react parity`
