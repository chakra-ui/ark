# Password Input Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/password-input/password-input.stories.ts`
- Angular examples: `packages/angular/password-input/examples/`
- Angular styles: `packages/angular/password-input/password-input-example-styles.ts`
- React story: `packages/react/src/components/password-input/password-input.stories.tsx`
- React examples: `packages/react/src/components/password-input/examples/`
- React styles: `.storybook/modules/password-input.module.css`, `.storybook/modules/field.module.css`

## Summary

- Status: Fixed Storybook export order, removed the extra Angular-only `DefaultVisible` public story, aligned
  `WithField` behavior, and added missing field wrapper styling.
- Highest-risk gaps: Angular's story list exposed one story not present in React; Angular `WithField` displayed the
  field error state while React keeps it non-invalid.

## Story Inventory

| Story name            | React | Angular | Notes                                                                                                                |
| --------------------- | ----- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| Autocomplete          | Yes   | Yes     | Same example intent; Angular needed ordering alignment.                                                              |
| Basic                 | Yes   | Yes     | Same structure and labels.                                                                                           |
| ControlledVisibility  | Yes   | Yes     | Angular example file is named `controlled.ts`, but export/story name matches.                                        |
| IgnorePasswordManager | Yes   | Yes     | Same API key label and seed value intent.                                                                            |
| RootProvider          | Yes   | Yes     | Angular uses `usePasswordInput({ context: () => ({}) })`, which is framework-idiomatic.                              |
| WithField             | Yes   | Yes     | Angular field wrapper was visibly invalid; React `Field.Root` is not invalid.                                        |
| StrengthMeter         | Yes   | Yes     | Angular computes equivalent thresholds locally because Angular package does not depend on `check-password-strength`. |
| WithValidation        | Yes   | Yes     | Same validation threshold and messages.                                                                              |
| DefaultVisible        | No    | Yes     | Removed from public Angular Storybook exports; example file remains for existing specs.                              |

## Example Data Sources

| Example               | Data origin                                         | Shape                               | Dynamic/async                         | Divergence                                                                                            |
| --------------------- | --------------------------------------------------- | ----------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Autocomplete          | Hard-coded label plus `autoComplete="new-password"` | Single password input               | None                                  | No change.                                                                                            |
| Basic                 | Hard-coded label                                    | Single password input               | None                                  | No change.                                                                                            |
| ControlledVisibility  | Local state/signal                                  | Boolean visible state               | User toggles visibility               | Angular uses `signal<boolean \| undefined>` and `[(visible)]`; no change.                             |
| IgnorePasswordManager | Hard-coded default value `spd_1234567890`           | Single API key value                | None                                  | React sets `defaultValue` on input; Angular sets it on root because the directive owns value seeding. |
| RootProvider          | Local password input machine                        | Root-provider API object            | User toggles visibility               | Angular output reads `passwordInput.api().visible`; no change.                                        |
| WithField             | Hard-coded helper/error strings                     | Field plus nested password input    | Field state controls error visibility | Angular invalid state removed to match React's non-invalid root.                                      |
| StrengthMeter         | Initial password `asdfasdf` and strength thresholds | `weak`, `medium`, `strong`          | User input recomputes strength        | Angular mirrors thresholds locally; no package dependency added.                                      |
| WithValidation        | Local password signal                               | Min-length validity at 8 characters | User input toggles messages           | No change.                                                                                            |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Password Input'` only.
- Decorator differences: React re-exports examples directly. Angular uses per-story `moduleMetadata` imports and
  template renders, matching neighboring Angular stories.
- Per-story decorators / args / controls: No args or controls on either side. Angular decorators only import each
  standalone example component.

## Styling

| Element            | React selector / class                                              | Angular selector / class                                                | Gap                                                                 | Fix                                                     |
| ------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| Root               | `.Root`                                                             | `[arkPasswordInputRoot]`, `[arkPasswordInputRootProvider]`              | Matched.                                                            | No change.                                              |
| Label              | `.Label`                                                            | `[arkPasswordInputLabel]`                                               | Matched.                                                            | No change.                                              |
| Control            | `.Control`                                                          | `[arkPasswordInputControl]`                                             | Matched.                                                            | No change.                                              |
| Input              | `.Input`                                                            | `[arkPasswordInputInput]`                                               | Matched; Angular had fallback vars only.                            | No change.                                              |
| Visibility trigger | `.VisibilityTrigger`                                                | `[arkPasswordInputVisibilityTrigger]`                                   | Matched.                                                            | No change.                                              |
| Indicator / icons  | `.Indicator`, lucide `EyeIcon` / `EyeOffIcon`                       | `[arkPasswordInputIndicator]`, Angular demo SVG components              | Angular icon SVGs now include explicit `1em` intrinsic size.        | Keep; trigger CSS still sets visible size to `1rem`.    |
| Strength meter     | `.StrengthMeter`, `.StrengthBar`, `.StrengthFill`, `.StrengthLabel` | `.strength-meter`, `.strength-bar`, `.strength-fill`, `.strength-label` | Matched.                                                            | No change.                                              |
| Validation message | `.ValidationMessage`                                                | `.validation-message`                                                   | Matched.                                                            | No change.                                              |
| Field wrapper      | `field.Root`, `field.HelperText`, `field.ErrorText`                 | `[arkFieldRoot]`, `[arkFieldHelperText]`, `[arkFieldErrorText]`         | Angular password-input styles did not include field module styling. | Add local field selectors mirroring `field.module.css`. |

## Gap Matrix

| Area               | Gap                                                                                                   | React reference                                                      | Angular location                   | Fix                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| Story list         | Angular exported `DefaultVisible`, which React does not expose.                                       | `password-input.stories.tsx` exports 8 stories, no `DefaultVisible`. | `password-input.stories.ts`        | Remove the public story export and reorder remaining exports to match React. |
| WithField behavior | Angular set `[invalid]="true"`, making error state visible; React `Field.Root` has no `invalid` prop. | `examples/with-field.tsx`                                            | `examples/with-field.ts`           | Remove the invalid binding.                                                  |
| WithField styling  | Angular password-input styles omitted field wrapper/helper/error rules.                               | `.storybook/modules/field.module.css`                                | `password-input-example-styles.ts` | Add field wrapper/helper/error selectors.                                    |

## Implementation Plan

1. Update `password-input.stories.ts` so exports are `Autocomplete`, `Basic`, `ControlledVisibility`,
   `IgnorePasswordManager`, `RootProvider`, `WithField`, `StrengthMeter`, `WithValidation`.
2. Remove the visible invalid state from the Angular `WithField` example.
3. Add field wrapper/helper/error styling to the password input example styles.
4. Run focused password-input tests, Angular typecheck if feasible, Storybook startup, and `git diff --check`.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6011 --ci` reached Storybook ready at
      `http://localhost:6011/`; stopped after startup.
- [ ] Visual check of each story: Not run; no browser side-by-side review performed in this pass.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci password-input/password-input.spec.ts` passed: 1
      file, 15 tests.
- [ ] Typecheck: `bun run --cwd packages/angular typecheck` failed before password-input verification completed because
      unrelated `combobox/examples/highlight-matching-text.ts` imports missing `@ark-ui/angular/highlight`.
- [x] Formatting:
      `bun prettier --check packages/angular/password-input/password-input.stories.ts packages/angular/password-input/examples/with-field.ts packages/angular/password-input/examples/icons.ts packages/angular/password-input/password-input-example-styles.ts docs/story-audit/password-input.md`
      passed.
- [x] Whitespace: `git diff --check` passed. `git diff --no-index --check /dev/null docs/story-audit/password-input.md`
      produced no whitespace warnings for the ignored audit file.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align password-input story with react parity`
