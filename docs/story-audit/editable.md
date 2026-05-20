# Editable Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/editable/editable.stories.ts`
- Angular examples: `packages/angular/editable/examples/*.ts`
- Angular styles: `packages/angular/editable/editable-example-styles.ts`
- React story: `packages/react/src/components/editable/editable.stories.tsx`
- React examples: `packages/react/src/components/editable/examples/*.tsx`
- React styles: `.storybook/modules/editable.module.css`, `.storybook/modules/field.module.css`

## Summary

- Status: Focused Angular story-surface fixes applied. Story inventory matches React; trigger icons and field styling
  are aligned.
- Highest-risk gaps: None remaining in the editable story surface.

## Story Inventory

| Story name   | React                      | Angular                       | Notes                                                                             |
| ------------ | -------------------------- | ----------------------------- | --------------------------------------------------------------------------------- |
| Basic        | `./examples/basic`         | `EditableBasicExample`        | Same order and root props.                                                        |
| Context      | `./examples/context`       | `EditableContextExample`      | Same context behavior; Angular uses template export and block control flow.       |
| Controlled   | `./examples/controlled`    | `EditableControlledExample`   | Same controlled value concept; Angular uses signal/model binding.                 |
| Controls     | `./examples/controls`      | `EditableControlsExample`     | Same editing-state trigger swap.                                                  |
| DoubleClick  | `./examples/double-click`  | `EditableDoubleClickExample`  | Same `activationMode="dblclick"` and default value.                               |
| RootProvider | `./examples/root-provider` | `EditableRootProviderExample` | Same provider story; Angular uses `useEditable({ context: ... })`.                |
| Textarea     | `./examples/textarea`      | `EditableTextareaExample`     | Same textarea value, activation mode, and helper text.                            |
| WithField    | `./examples/with-field`    | `EditableWithFieldExample`    | Same field wrapper and helper/error text, but Angular needs field styling parity. |

## Example Data Sources

| Example      | Data origin                                       | Shape                                                             | Dynamic/async                              | Divergence                                                                         |
| ------------ | ------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| Basic        | Inline props and literal label/default text.      | One editable root with label, area, input, preview, edit trigger. | None.                                      | Trigger content differs before fix: React icon, Angular text.                      |
| Context      | Inline props and context editing state.           | One editable root plus conditional helper/control.                | Conditional render based on editing state. | Trigger content differs before fix: React icon, Angular text.                      |
| Controlled   | React `useState`; Angular `signal` model binding. | Single string value initialized to `Hello World`.                 | User edits update local state.             | Framework-idiomatic state wiring; no change. Trigger content differs before fix.   |
| Controls     | Inline default value and editing state.           | Edit trigger when idle; submit/cancel triggers while editing.     | Conditional render based on editing state. | Trigger content differs before fix: React icons, Angular text.                     |
| DoubleClick  | Inline root props.                                | One editable root with label, area, input, preview.               | None.                                      | No story-surface data divergence.                                                  |
| RootProvider | `useEditable` hook/composable.                    | Editable API value initialized with `Hello World`.                | None.                                      | Framework-idiomatic hook signature; no change. Trigger content differs before fix. |
| Textarea     | Inline root props and literal description.        | Textarea input plus preview with textarea styling.                | None.                                      | No story-surface data divergence.                                                  |
| WithField    | Inline field/editable text.                       | Field root wraps editable root, helper, and error text.           | None.                                      | Field styles missing before fix.                                                   |

## Sections / Structure

- Meta differences: Both use `title: 'Components / Editable'`; neither defines parameters, decorators, argTypes, args,
  or tags at meta level.
- Decorator differences: React re-exports example functions directly. Angular uses per-story `moduleMetadata` imports
  and a render template for each standalone example, matching neighboring Angular story conventions.
- Per-story decorators / args / controls: No story has custom args or controls. Angular story order matches React:
  Basic, Context, Controlled, Controls, DoubleClick, RootProvider, Textarea, WithField.

## Styling

| Element         | React selector / class                             | Angular selector / class                                                               | Gap                                                                                                                       | Fix                                                                                       |
| --------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Root            | `.Root`                                            | `[arkEditableRoot], [arkEditableRootProvider]`                                         | Matches layout, width, disabled opacity, and color tokens.                                                                | No change.                                                                                |
| Label           | `.Label`                                           | `[arkEditableLabel]`                                                                   | Matches editable labels. `WithField` uses field label sizing in React via `field.Label`, but applied to `Editable.Label`. | Add field-context label styling under `[arkFieldRoot] [arkEditableLabel]`.                |
| Area            | `.Area`                                            | `[arkEditableArea]`                                                                    | Matches flex layout and positioning.                                                                                      | No change.                                                                                |
| Input / preview | `.Input`, `.Preview`                               | `[arkEditableInput]`, `[arkEditablePreview]`                                           | Matches sizing, border, background, placeholder, hover, focus.                                                            | No change.                                                                                |
| Control         | `.Control`                                         | `[arkEditableControl]`                                                                 | Matches flex gap and top padding.                                                                                         | No change.                                                                                |
| Triggers        | `.EditTrigger`, `.SubmitTrigger`, `.CancelTrigger` | `[arkEditableEditTrigger]`, `[arkEditableSubmitTrigger]`, `[arkEditableCancelTrigger]` | Angular renders text; React renders `PencilIcon`, `CheckIcon`, `XIcon` and sizes nested SVGs.                             | Add local SVG icon components, use them in trigger templates, and add trigger SVG sizing. |
| Textarea        | `.Textarea`                                        | `.textarea`                                                                            | Matches min-height, padding, line-height, span/textarea state styling.                                                    | No change.                                                                                |
| Helper text     | `.HelperText`, `field.HelperText`                  | `.helper-text`, `[arkFieldHelperText]`                                                 | Editable helper matches; field helper/error styles missing.                                                               | Add `[arkFieldHelperText]` and `[arkFieldErrorText]` styles.                              |

## Gap Matrix

| Area              | Gap                                                                                | React reference                                                                     | Angular location                                                                                                | Fix                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Trigger content   | Edit, submit, and cancel triggers use text instead of icons.                       | `PencilIcon`, `CheckIcon`, `XIcon` in React examples.                               | `packages/angular/editable/examples/basic.ts`, `context.ts`, `controlled.ts`, `controls.ts`, `root-provider.ts` | Add editable icon components and replace text content with matching icons. |
| Trigger styling   | Angular styles do not size nested trigger SVGs.                                    | `.EditTrigger, .SubmitTrigger, .CancelTrigger & svg { width: 1rem; height: 1rem; }` | `packages/angular/editable/editable-example-styles.ts`                                                          | Add nested SVG sizing selector.                                            |
| WithField styling | Angular field wrapper/helper/error text lacks React field module visual treatment. | `.storybook/modules/field.module.css`                                               | `packages/angular/editable/examples/with-field.ts`, `packages/angular/editable/editable-example-styles.ts`      | Add field root/helper/error selectors to editable example styles.          |

## Implementation Plan

1. Create editable-local icon components for pencil, check, and x SVGs.
2. Import those icons into the Angular examples that render editable controls and replace text trigger content with the
   matching icon components.
3. Extend editable example styles with trigger SVG sizing and field wrapper/helper/error selectors.
4. Run Angular story-surface verification and `git diff --check`.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6010 --ci` reached `Storybook ready` at
      `http://localhost:6010/`; server was stopped after startup. The first attempt failed while parallel combobox
      example files were not yet present, then passed after those files appeared.
- [x] Angular typecheck: `bun run --cwd packages/angular typecheck` passed, including production Angular build and
      `forms isolation: ok`.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci editable` passed: 1 test file, 19 tests.
- [x] `git diff --check`: passed.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align editable story with react parity`
