# List Selection Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/collection/list-selection.stories.ts`
- Angular examples: `packages/angular/src/collection/examples/list-selection-basic.ts`,
  `packages/angular/src/collection/examples/list-selection-multiple.ts`,
  `packages/angular/src/collection/examples/list-selection-range.ts`
- Angular styles: `packages/angular/src/collection/list-selection-example-styles.ts`
- React story: `packages/react/src/components/collection/list-selection.stories.tsx`
- React examples: `packages/react/src/components/collection/examples/list-selection/basic.tsx`,
  `packages/react/src/components/collection/examples/list-selection/multiple.tsx`,
  `packages/react/src/components/collection/examples/list-selection/range.tsx`
- React styles: `.storybook/modules/list-selection.module.css`

## Summary

- Status: Fixed Angular example rendering, interaction copy, and demo styling to match the React Storybook surface.
- Highest-risk gaps: Range interaction differs between framework APIs because Angular exposes
  `firstSelectedValue(collection)` as a method while React exposes `firstSelectedValue` on the hook result. The visible
  behavior is matched.

## Story Inventory

| Story name | React           | Angular         | Notes                       |
| ---------- | --------------- | --------------- | --------------------------- |
| `Basic`    | Present, first  | Present, first  | Same title and story order. |
| `Multiple` | Present, second | Present, second | Same title and story order. |
| `Range`    | Present, third  | Present, third  | Same title and story order. |

## Example Data Sources

| Example    | Data origin                                                   | Shape                                                                        | Dynamic/async | Divergence                                                                                                                                   |
| ---------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Basic`    | Hard-coded local item array passed to `createListCollection`. | Four `{ label, value }` framework items: React, Vue, Angular, Svelte.        | None.         | No data divergence. Angular uses `createListSelection()` plus a signal instead of React `useListSelection`.                                  |
| `Multiple` | Hard-coded local item array passed to `createListCollection`. | Five `{ label, value }` framework items: React, Vue, Angular, Svelte, Solid. | None.         | No data divergence. Angular toggles all with `setSelection(collection.getValues())`; React uses `setSelectedValues(collection.getValues())`. |
| `Range`    | Hard-coded local item array passed to `createListCollection`. | Five `{ label, value }` framework items: React, Vue, Angular, Svelte, Solid. | None.         | Fixed Angular from preset range buttons to the React click / Shift+Click / Cmd/Ctrl+Click interaction model.                                 |

## Sections / Structure

- Meta differences: Both stories use `title: 'Utilities / List Selection'`; neither defines args, argTypes, parameters,
  decorators, or tags at the meta level.
- Decorator differences: Angular stories use `moduleMetadata` imports and explicit template render functions for
  standalone example components. React re-exports example functions directly. This is framework-idiomatic and requires
  no change.
- Per-story decorators / args / controls: Angular has one `moduleMetadata` decorator per story. Neither framework
  defines per-story args or controls.

## Styling

| Element           | React selector / class | Angular selector / class            | Gap                                                                                                 | Fix                                                                                |
| ----------------- | ---------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Root              | `.Root`                | `.list-selection-root`              | Angular used inline grid styles with narrower widths and larger gaps.                               | Added shared Angular styles matching React flex column, gap, width, and max-width. |
| Header            | `.Header`              | `.list-selection-header`            | Angular header lacked divider, padding, margin, and exact spacing.                                  | Added matching flex alignment, border, padding, and margin.                        |
| Count             | `.Count`               | `.list-selection-count`             | Angular used an unstyled `output`.                                                                  | Switched to styled `span`, matching React.                                         |
| Select-all button | `.SelectAllButton`     | `.list-selection-select-all-button` | Angular button used browser default styles.                                                         | Added React text-button styling and hover underline.                               |
| Item              | `.Item`                | `.list-selection-item`              | Angular items lacked padding, border radius, hover state, selected background, and selected border. | Added matching selectors and selected state styling.                               |
| Checkbox          | `.Checkbox`            | `.list-selection-checkbox`          | Angular used native checkbox rendering.                                                             | Added custom checkbox appearance, checked mark, and focus ring.                    |
| Item text         | `.ItemText`            | `.list-selection-item-text`         | Angular rendered bare text.                                                                         | Added span wrapper and matching typography.                                        |
| Helper text       | `.HelperText`          | `.list-selection-helper-text`       | Angular Range used button controls instead of helper copy.                                          | Replaced controls with React helper text and matching typography.                  |

## Gap Matrix

| Area                      | Gap                                                                              | React reference                                                   | Angular location             | Fix                                                                         |
| ------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| Basic copy                | Empty selection fallback was `none`; extra `Clear selection` button was present. | `Selected` output with `None` fallback; no clear button.          | `list-selection-basic.ts`    | Changed fallback to `None` and removed the extra button/method.             |
| Multiple count and button | Count and select-all button lacked React classes and styling.                    | `styles.Count`, `styles.SelectAllButton`.                         | `list-selection-multiple.ts` | Added classed count and button using shared styles.                         |
| Range interaction         | Angular exposed manual range buttons instead of item click modifiers.            | `handleItemClick(value, event)` with Shift and Cmd/Ctrl branches. | `list-selection-range.ts`    | Implemented item click handler using Angular `Selection` methods.           |
| Demo styling              | Angular inline styles did not mirror React CSS module.                           | `.storybook/modules/list-selection.module.css`                    | All three Angular examples   | Added `list-selection-example-styles.ts` and imported it from each example. |

## Implementation Plan

1. Add a shared Angular list-selection demo style module that mirrors React's CSS module.
2. Update `Basic` to remove Angular-only clear controls, match `None` copy, and apply styled item/checkbox/text classes.
3. Update `Multiple` to match the React header, count, select-all button, item markup, and shared styling.
4. Update `Range` to replace preset action buttons with click, Shift+Click, and Cmd/Ctrl+Click item behavior plus helper
   text.
5. Run focused Angular checks, Storybook startup, and whitespace verification.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6014 --ci` reached Storybook ready at
      `http://localhost:6014/`; stopped after startup. Existing warnings were unused TypeScript compilation entries and
      a `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Browser side-by-side review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/collection/collection.spec.ts` passed, 1 file /
      12 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/collection/list-selection.stories.ts packages/angular/src/collection/examples/list-selection-basic.ts packages/angular/src/collection/examples/list-selection-multiple.ts packages/angular/src/collection/examples/list-selection-range.ts packages/angular/src/collection/list-selection-example-styles.ts docs/story-audit/list-selection.md`
      passed.
- [x] Whitespace: `git diff --check` passed. Scoped tracked
      `git diff --check -- packages/angular/src/collection/list-selection.stories.ts packages/angular/src/collection/examples/list-selection-basic.ts packages/angular/src/collection/examples/list-selection-multiple.ts packages/angular/src/collection/examples/list-selection-range.ts packages/angular/src/collection/list-selection-example-styles.ts`
      passed. New shared style file and ignored audit doc were checked with
      `git diff --no-index --check /dev/null packages/angular/src/collection/list-selection-example-styles.ts` and
      `git diff --no-index --check /dev/null docs/story-audit/list-selection.md` and produced no whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align list-selection story with react parity`
