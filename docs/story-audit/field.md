# Field Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/field/field.stories.ts`
- Angular examples: `packages/angular/field/examples/`
- Angular styles: `packages/angular/field/field-example-styles.ts`
- React story: `packages/react/src/components/field/field.stories.tsx`
- React examples: `packages/react/src/components/field/examples/`
- React styles: `.storybook/modules/field.module.css`, `.storybook/modules/button.module.css`

## Summary
- Status: Aligned after adding the missing Angular `ShadowDom` story and matching the React export order.
- Highest-risk gaps: Shadow DOM parity depends on Angular's native `ViewEncapsulation.ShadowDom` and the Ark environment token instead of React's `react-shadow` host and `EnvironmentProvider`.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Input | Yes | Yes | Same label, input, helper text, and error text. |
| Invalid | Yes | Yes | Same invalid state, email label, placeholder, and error text. |
| RequiredIndicator | Yes | Yes | Same required root, username label, indicator, and input. |
| RootProvider | Yes | Yes | Same toggle-driven invalid state and field surface; Angular uses `signal` with `useField`. |
| Select | Yes | Yes | Same three hard-coded options and supporting text. |
| ShadowDom | Yes | Yes | Added Angular story using native Shadow DOM encapsulation and Ark environment provider. |
| Textarea | Yes | Yes | Same textarea and supporting text. |
| TextareaAutoresize | Yes | Yes | Same textarea with autoresize enabled. |
| Disabled | Yes | Yes | Same disabled root and supporting text. |
| CustomControl | Yes | Yes | Same custom input props example through field context. |
| Item | Yes | Yes | Same target, currency select, amount input, helper, and error text. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Input | Hard-coded template text. | One root with label, input, helper, error. | None. | No change. |
| Invalid | Hard-coded template text and placeholder. | One invalid root with email input and error. | None. | No change. |
| RequiredIndicator | Hard-coded template text. | One required root with label, indicator, input. | None. | Angular renders `*` text in the indicator; React uses the component default. |
| RootProvider | Local component state. | Boolean invalid state controls one field instance. | User click toggles invalid state; no async. | Angular uses `signal(false)` and `useField({ context })`; React uses `useState(false)` and `useField({ invalid })`. |
| Select | Hard-coded options. | Three options with string values `1`, `2`, `3`. | None. | No change. |
| ShadowDom | Hard-coded template text and placeholder. | One invalid root with email input and error inside a shadow root. | None. | Angular uses native Shadow DOM encapsulation instead of `react-shadow`. |
| Textarea | Hard-coded template text. | One root with textarea, helper, error. | None. | No change. |
| TextareaAutoresize | Hard-coded template text. | One root with autoresizing textarea, helper, error. | None. | No change. |
| Disabled | Hard-coded template text. | One disabled root with input, helper, error. | None. | No change. |
| CustomControl | Field context props. | One invalid field with custom input props. | None. | Angular uses `ArkPropsDirective` with `field.getInputProps()`. |
| Item | Hard-coded options and input. | Target `amount`, currency select with two options, amount input. | None. | No change. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Field'`; neither defines args, argTypes, tags, or parameters.
- Decorator differences: React re-exports example components directly. Angular uses `moduleMetadata` per story to import standalone example components.
- Per-story decorators / args / controls: No args or controls on either side. Angular story order now matches the React re-export order: `Input`, `Invalid`, `RequiredIndicator`, `RootProvider`, `Select`, `ShadowDom`, `Textarea`, `TextareaAutoresize`, `Disabled`, `CustomControl`, `Item`.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkFieldRoot]`, `[arkFieldRootProvider]` | Angular includes `font-family: inherit`; otherwise same visual contract. | No change; Angular addition is harmless and consistent with form controls. |
| Disabled root | `.Root[data-disabled]` | `[arkFieldRoot][data-disabled]`, `[arkFieldRootProvider][data-disabled]` | None. | No change. |
| Label | `.Label` | `[arkFieldLabel]` | None. | No change. |
| Input | `.Input` | `[arkFieldInput]` | None. | No change. |
| Textarea | `.Textarea` | `[arkFieldTextarea]` | None. | No change. |
| Select | `.Select` | `[arkFieldSelect]` | None. | No change. |
| Helper text | `.HelperText` | `[arkFieldHelperText]` | None. | No change. |
| Error text | `.ErrorText` | `[arkFieldErrorText]` | None. | No change. |
| Required indicator | Component default | `[arkFieldRequiredIndicator]` | Angular adds explicit coral color and margin. | No change; improves parity with expected required/error accent. |
| RootProvider button | `styles/button.module.css` plus `marginBottom: '1rem'` | `.field-demo-button` inside `.field-demo-stack` | Angular stack produces equivalent spacing via flex gap and local button styling. | No change; Storybook surface remains equivalent. |
| Shadow DOM | Unstyled field inside React shadow host. | Unstyled field inside Angular shadow root. | Story missing before fix. | Added `FieldShadowDomExample`. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | `ShadowDom` missing from Angular. | `packages/react/src/components/field/field.stories.tsx` export `ShadowDom`. | `packages/angular/field/field.stories.ts` | Added `ShadowDom` story and `packages/angular/field/examples/shadow-dom.ts`. |
| Story ordering | Angular export order differed from React. | React story re-export order. | `packages/angular/field/field.stories.ts` | Reordered Angular exports to match React. |

## Implementation Plan
1. Add `FieldShadowDomExample` with native Angular Shadow DOM encapsulation, invalid field content, and an Ark environment provider scoped to the component's shadow root.
2. Import the new example in `field.stories.ts` and add the `ShadowDom` story.
3. Reorder Angular story exports to match the React story inventory.
4. Run focused verification and record results.

## Deferred (component-level work)
- None.

## Verification
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production package build and `forms isolation: ok`.
- [ ] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6010 --ci` was attempted but the global Storybook build failed before startup on unrelated Combobox imports: `./examples/creatable`, `./examples/rehydrate-value`, and `./examples/virtualized`.
- [ ] Visual check of each story: Deferred because Storybook startup is blocked by unrelated Combobox story errors.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci field/field.spec.ts` passed, 21 tests in 1 file.
- [x] Diff check: `git diff --check -- packages/angular/field/field.stories.ts` passed; no-index whitespace checks for `packages/angular/field/examples/shadow-dom.ts` and `docs/story-audit/field.md` produced no whitespace-error output.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align field story with react parity`
