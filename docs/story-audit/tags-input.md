# Tags Input Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/tags-input/tags-input.stories.ts`
- Angular examples: `packages/angular/tags-input/examples/`
- Angular styles: `packages/angular/tags-input/tags-input-example-styles.ts`
- React story: `packages/react/src/components/tags-input/tags-input.stories.tsx`
- React examples: `packages/react/src/components/tags-input/examples/`
- React styles: `.storybook/modules/tags-input.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/field.module.css`, `.storybook/modules/combobox.module.css`

## Summary

- Status: Focused Angular story-surface fixes applied for story order, trigger icons, controlled/field copy, field
  styling, and root-provider layout.
- Highest-risk gaps: React's `WithCombobox` example remains component-level work because it composes
  `Combobox.Input asChild` with `TagsInput.Input` on the same input element. Angular's `arkComboboxInput` and
  `arkTagsInputInput` each apply host props independently, so stacking both directives would conflict over the input id,
  value, and event handlers.

## Story Inventory

| Story name           | React      | Angular | Notes                                                                                    |
| -------------------- | ---------- | ------- | ---------------------------------------------------------------------------------------- |
| AllowDuplicates      | Yes, first | Yes     | Export order now matches React.                                                          |
| Basic                | Yes        | Yes     | No data divergence.                                                                      |
| BlurBehavior         | Yes        | Yes     | No data divergence.                                                                      |
| Controlled           | Yes        | Yes     | Label, clear trigger, item input directive import, and icon surface now match React.     |
| ControlledInputValue | Yes        | Yes     | Same input-value controls. Local icon surface now matches React.                         |
| Delimiter            | Yes        | Yes     | Same delimiter pattern and copy. Local icon surface now matches React.                   |
| Disabled             | Yes        | Yes     | Same default values and disabled state. Local icon surface now matches React.            |
| DisabledEditing      | Yes        | Yes     | Same `editable=false` state. Local icon surface now matches React.                       |
| Invalid              | Yes        | Yes     | Same invalid prop. Local icon surface now matches React.                                 |
| MaxTagLength         | Yes        | Yes     | Same max length and label copy. Local icon surface now matches React.                    |
| MaxWithOverflow      | Yes        | Yes     | Same max and overflow props. Local icon surface now matches React.                       |
| PasteBehavior        | Yes        | Yes     | Same paste delimiter behavior. Local icon surface now matches React.                     |
| ProgrammaticControl  | Yes        | Yes     | Same button actions and root provider use. Icon surface and shared button styling fixed. |
| Readonly             | Yes        | Yes     | Same default values and read-only state. Local icon surface now matches React.           |
| SanitizeValue        | Yes        | Yes     | Same sanitizer and email copy. Local icon surface now matches React.                     |
| RootProvider         | Yes        | Yes     | Export order and stack wrapper around output now match React.                            |
| Validation           | Yes        | Yes     | Same validation predicate. Local icon surface now matches React.                         |
| WithCombobox         | Yes        | No      | Deferred component-level composition gap.                                                |
| WithField            | Yes        | Yes     | Helper/error copy, field styling, clear trigger, and icon surface fixed.                 |

## Example Data Sources

| Example                                                                                                             | Data origin                                        | Shape                                       | Dynamic/async                                             | Divergence                                                        |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| Basic / AllowDuplicates / BlurBehavior / DisabledEditing / Invalid / MaxTagLength / MaxWithOverflow / PasteBehavior | Primitive-managed value, no local data             | `string[]` tags from the tags input API     | User input only                                           | None.                                                             |
| Controlled                                                                                                          | Local state                                        | `string[]`, initial `['React', 'Solid']`    | User input updates controlled signal/state                | Angular uses `signal`; React uses `useState`. No behavior change. |
| ControlledInputValue                                                                                                | Local input state                                  | `string`, initial empty                     | Buttons set input to `React` or empty                     | Angular uses `signal`; React uses `useState`. No behavior change. |
| Delimiter                                                                                                           | Local regex constant                               | `/[,;\s]/`                                  | User input parsed by delimiter                            | None.                                                             |
| Disabled / Readonly                                                                                                 | Inline default value                               | `['React', 'Solid', 'Vue']`                 | Static initial state                                      | None.                                                             |
| ProgrammaticControl                                                                                                 | `useTagsInput` API                                 | API-managed `string[]`                      | Buttons add/set/clear values                              | Angular passes `context: () => ({})`; framework-idiomatic.        |
| RootProvider                                                                                                        | `useTagsInput` API                                 | API-managed `string[]` shown as JSON        | Output reflects API state                                 | Angular uses `JsonPipe`; visible JSON surface matches.            |
| SanitizeValue                                                                                                       | Local sanitizer function                           | `string -> string`                          | Trims and lowercases input                                | None.                                                             |
| Validation                                                                                                          | Local regex and predicate                          | `TagsInputValidateArgs`                     | Rejects short, duplicate, or non-alphanumeric tags        | None.                                                             |
| WithField                                                                                                           | Field wrapper plus primitive state                 | Tags input inside field root                | Helper/error text static                                  | Copy and field styling fixed.                                     |
| WithCombobox                                                                                                        | React combines tags input and combobox collections | Nine framework strings filtered by combobox | Filters on input and adds selected combobox value to tags | Deferred for Angular multi-directive composition support.         |

## Sections / Structure

- Meta differences: None. Both stories use `title: 'Components / Tags Input'` with no args, argTypes, parameters, tags,
  or decorators.
- Decorator differences: Angular uses per-story `moduleMetadata` imports and render templates; React re-exports each
  example directly. This is framework-idiomatic.
- Per-story decorators / args / controls: Angular has no args or controls. Export order now matches React except the
  deferred `WithCombobox` story.

## Styling

| Element                                               | React selector / class                                             | Angular selector / class                                                                                                                         | Gap                                                                            | Fix                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Root / label / control / item / input / clear trigger | `.Root`, `.Label`, `.Control`, `.Item*`, `.Input`, `.ClearTrigger` | `[arkTagsInputRoot]`, `[arkTagsInputLabel]`, `[arkTagsInputControl]`, `[arkTagsInputItem*]`, `[arkTagsInputInput]`, `[arkTagsInputClearTrigger]` | Core selectors already mirror React.                                           | No change beyond local icon rendering.                         |
| Delete / clear icons                                  | Lucide `XIcon`                                                     | Text `x`                                                                                                                                         | Angular triggers render text glyphs.                                           | Add local SVG icon and render it inside delete/clear triggers. |
| Shared buttons                                        | `button.Root`                                                      | `.tags-input-button`                                                                                                                             | Angular buttons are shorter and lack shared hover/focus/disabled/icon styling. | Expand `.tags-input-button` to match shared button module.     |
| Field wrapper                                         | `field.Root`, `field.HelperText`, `field.ErrorText`                | `[arkFieldRoot]`, `[arkFieldHelperText]`, `[arkFieldErrorText]`                                                                                  | Angular lacks field-module visual treatment.                                   | Add field selectors to tags input styles.                      |
| Root provider output layout                           | Global `.stack`                                                    | no wrapper                                                                                                                                       | Output lacks explicit stacked spacing.                                         | Wrap root provider and output in `.tags-input-stack`.          |
| Combobox popup                                        | `combobox.Content`, `combobox.Item*`                               | None                                                                                                                                             | Missing story, not just missing styling.                                       | Deferred component-level work.                                 |

## Gap Matrix

| Area             | Gap                                                                                             | React reference                               | Angular location                                         | Fix                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Story order      | `RootProvider`, `Validation`, and `WithField` order differs; `AllowDuplicates` follows `Basic`. | `tags-input.stories.tsx`                      | `tags-input.stories.ts`                                  | Reorder Angular exports to match React order excluding deferred `WithCombobox`. |
| Trigger content  | Delete and clear triggers use text instead of SVG X icons.                                      | React examples using `XIcon`                  | Angular examples                                         | Add local `TagsInputXIcon` and render it in trigger buttons.                    |
| Controlled story | Label says `Tags`, missing clear trigger, and item input directive is not imported.             | `examples/controlled.tsx`                     | `examples/controlled.ts`                                 | Match label, add clear trigger, and import the item input directive.            |
| WithField story  | Helper/error copy differs, lacks clear trigger, lacks field styling.                            | `examples/with-field.tsx`, `field.module.css` | `examples/with-field.ts`, `tags-input-example-styles.ts` | Match copy, trigger surface, and field selectors.                               |
| Button styling   | Programmatic/input control buttons do not match shared button module.                           | `button.module.css`                           | `tags-input-example-styles.ts`                           | Expand `.tags-input-button`.                                                    |
| WithCombobox     | React story cannot be represented with current Angular primitive composition.                   | `examples/with-combobox.tsx`                  | No Angular story                                         | Defer as component-level work.                                                  |

## Implementation Plan

1. Reorder story exports to match React where Angular has supported examples. Done.
2. Add local X icon component and use it in tags input delete and clear triggers. Done.
3. Fix controlled, root-provider, and with-field examples to match React visible copy/layout. Done.
4. Update tags input demo styles for shared buttons and field wrapper text. Done.
5. Run focused verification and record results. Done.

## Deferred (component-level work)

- Add a documented Angular composition path for examples that need one native input to receive both combobox and
  tags-input behavior. React's `WithCombobox` uses `Combobox.Input asChild` around `TagsInput.Input`; Angular's current
  directives independently call `applyArkProps` on the same host and would overwrite/conflict on id, value, and event
  props.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6012 --ci` reached Storybook ready at
      `http://localhost:6012/`, then the server was stopped. Existing warnings only: unused TypeScript compilation
      entries and a `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Not performed; Storybook startup/compile was verified but no browser side-by-side
      review was run.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci tags-input/tags-input.spec.ts` passed, 1 file / 16
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/tags-input/tags-input.stories.ts packages/angular/tags-input/tags-input-example-styles.ts packages/angular/tags-input/examples/*.ts docs/story-audit/tags-input.md`
      passed.
- [x] Whitespace:
      `git diff --check -- packages/angular/tags-input/tags-input.stories.ts packages/angular/tags-input/tags-input-example-styles.ts packages/angular/tags-input/examples`
      passed. No-index whitespace checks for new `packages/angular/tags-input/examples/icons.ts` and ignored
      `docs/story-audit/tags-input.md` produced no warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align tags-input story with react parity`
