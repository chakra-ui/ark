# Interaction Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/providers/interaction/interaction.stories.ts`
- Angular examples: `packages/angular/src/providers/interaction/examples/`
- Angular styles: none before this audit; add `packages/angular/src/providers/interaction/interaction-example-styles.ts`
- React story: `packages/react/src/providers/interaction/interaction.stories.tsx`
- React examples: `packages/react/src/providers/interaction/examples/`
- React styles: `.storybook/modules/interaction.module.css`

## Summary

- Status: Story inventory and order already match React. Angular examples need markup and demo styling parity.
- Highest-risk gaps: Angular provider currently exposes `pointer | keyboard | null` modality only and has no story-level
  equivalent for React `useFocusVisible({ isTextInput: true })`; these require component/provider API work, not
  story-only changes.

## Story Inventory

| Story name              | React | Angular | Notes                                                                                      |
| ----------------------- | ----- | ------- | ------------------------------------------------------------------------------------------ |
| `InteractionModality`   | Yes   | Yes     | Same order. React re-exports example; Angular uses `moduleMetadata` and a render template. |
| `FocusVisible`          | Yes   | Yes     | Same order.                                                                                |
| `FocusVisibleTextInput` | Yes   | Yes     | Same order.                                                                                |

## Example Data Sources

| Example                 | Data origin                                                                                                                                                      | Shape                                            | Dynamic/async                       | Divergence                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------- | --------------------------------------------------------------------------- |
| `InteractionModality`   | React `useInteractionModality()`; Angular `injectArkInteraction().modality()`                                                                                    | Single modality value                            | Dynamic document interaction state  | Angular provider does not surface React/Zag `virtual` modality.             |
| `FocusVisible`          | React `useFocusVisible()` plus local focused state; Angular `injectArkInteraction().isFocusVisible()` plus local focused signal                                  | Boolean focus-visible state and local focus flag | Dynamic focus and interaction state | Story behavior matches keyboard/pointer demo paths.                         |
| `FocusVisibleTextInput` | React `useFocusVisible({ isTextInput: true })` plus local focused field state; Angular `injectArkInteraction().isFocusVisible()` plus local focused-field signal | Boolean focus-visible state and focused field id | Dynamic focus and interaction state | Angular has no story-only way to request the text-input focus-visible mode. |

## Sections / Structure

- Meta differences: Both stories use `title: 'Utilities / Interaction'`. Neither sets parameters, decorators, argTypes,
  args, or tags on the meta.
- Decorator differences: React re-exports named examples directly. Angular wraps each standalone example with
  `moduleMetadata({ imports: [...] })` and a render template, matching local Angular Storybook conventions.
- Per-story decorators / args / controls: No story args or controls in either stack.

## Styling

| Element          | React selector / class                           | Angular selector / class | Gap                                                                              | Fix                                                       |
| ---------------- | ------------------------------------------------ | ------------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Root layout      | `.Container`                                     | none before audit        | Angular examples render unstyled blocks.                                         | Add shared `.container` styles and apply across examples. |
| Modality badge   | `.Badge[data-modality]`                          | none before audit        | Angular rendered plain text instead of a badge.                                  | Add `.badge` styles and bind `data-modality`.             |
| Hint/status copy | `.Hint`, `.Status`                               | none before audit        | Angular copy is unstyled and `InteractionModality` has extra focus-visible line. | Match React copy and status styling.                      |
| Demo button      | `.Button[data-focus-visible]`                    | none before audit        | Angular buttons lack shared dimensions, hover, and focus-ring styling.           | Add `.button` styles and classes.                         |
| Text fields      | `.Field`, `.Label`, `.Input[data-focus-visible]` | none before audit        | Angular text-input example lacks field and input styles.                         | Add equivalent classes and selectors.                     |

## Gap Matrix

| Area                          | Gap                                                                                                  | React reference                                                     | Angular location                                                     | Fix                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Interaction story markup      | Angular `InteractionModality` shows a plain modality paragraph and separate focus-visible paragraph. | `packages/react/src/providers/interaction/examples/interaction.tsx` | `packages/angular/src/providers/interaction/examples/interaction.ts` | Render badge, hint, and button like React.                         |
| Demo styling                  | Angular has no counterpart to `interaction.module.css`.                                              | `.storybook/modules/interaction.module.css`                         | `packages/angular/src/providers/interaction/examples/*.ts`           | Add `interaction-example-styles.ts` and import it in each example. |
| Interaction modality API      | Angular does not expose `virtual` modality.                                                          | React `useInteractionModality()` from `@zag-js/focus-visible`       | `packages/angular/src/providers/interaction/interaction.ts`          | Deferred component-level work.                                     |
| Text-input focus-visible mode | Angular cannot pass `isTextInput: true`.                                                             | `useFocusVisible({ isTextInput: true })`                            | `packages/angular/src/providers/interaction/interaction.ts`          | Deferred component-level work.                                     |

## Implementation Plan

1. Add Angular demo styles mirroring React `interaction.module.css`.
2. Update `InteractionModality` markup to use the React badge, hint, and button surface.
3. Apply shared container/status/button/field/input classes to the focus-visible examples.
4. Run the interaction spec, Angular typecheck, Storybook startup, formatter/checks, and `git diff --check`.

## Deferred (component-level work)

- Add Angular provider support for the `virtual` interaction modality if full parity with React/Zag interaction modality
  is required.
- Add an Angular equivalent to React `useFocusVisible({ isTextInput: true })` for text-input-specific focus-visible
  behavior.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6243 --ci` failed before serving with
      unrelated Angular/Babel cache `ENOENT` for `packages/angular/.angular/cache/21.2.11/babel-webpack`. After
      recreating the cache directory, `bun run --cwd packages/angular storybook -- --port 6244 --ci` failed on unrelated
      global Storybook imports: `packages/angular/combobox/examples/highlight-matching-text.ts` cannot resolve
      `@ark-ui/angular/highlight`, and `packages/angular/src/providers/environment/examples/basic.ts` cannot resolve
      `@ark-ui/angular/frame`.
- [ ] Visual check of each story: Not performed because Storybook did not serve due unrelated global Storybook build
      errors.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/providers/interaction/interaction.spec.ts`
      passed, 1 file / 7 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting / whitespace: `bun prettier --write ...interaction files... docs/story-audit/interaction.md` completed;
      `git diff --check` passed; `git diff --no-index --check /dev/null docs/story-audit/interaction.md` emitted no
      whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align interaction story with react parity`
