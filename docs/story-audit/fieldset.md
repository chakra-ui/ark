# Fieldset Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/fieldset/fieldset.stories.ts`
- Angular examples: `packages/angular/fieldset/examples/`
- Angular styles: `packages/angular/fieldset/fieldset-example-styles.ts`
- React story: `packages/react/src/components/fieldset/fieldset.stories.tsx`
- React examples: `packages/react/src/components/fieldset/examples/`
- React styles: `.storybook/modules/fieldset.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/select.module.css`, `.storybook/modules/checkbox.module.css`

## Summary
- Status: Angular story surface aligned with the React story exports and visible example structure.
- Highest-risk gaps: Angular does not currently expose a checkbox primitive equivalent to `@ark-ui/react/checkbox`, so the added `WithCheckbox` story uses native checkbox controls styled to match the React demo surface.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Yes | Yes | Same contact details fieldset with name and email fields. |
| `Disabled` | Yes | Yes | Same shipping address content and disabled root. |
| `Invalid` | Yes | Yes | Same account information content and invalid nested fields. |
| `PhoneInput` | Yes | Yes | Same extension collection and focus handoff behavior. |
| `RootProvider` | Yes | Yes | Angular visible template now matches React by removing the extra toggle wrapper. |
| `WithCheckbox` | Yes | Yes | Added in Angular with native checkbox controls because no Angular checkbox primitive exists. |
| `WithField` | Yes | Yes | Same personal information field composition. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded template fields | Two fields: name, email | None | No change. |
| `Disabled` | Hard-coded template fields | Two fields: street, city | None | Angular uses `value` attributes instead of React `defaultValue`; same rendered values. |
| `Invalid` | Hard-coded template fields | Two invalid fields: username, email | None | Angular uses `value` attributes instead of React `defaultValue`; same rendered values. |
| `PhoneInput` | Inline `createListCollection` items | Four extensions: `+1`, `+44`, `+49`, `+41` | `setTimeout` focuses the input after legend click or select value change | Angular uses `@ark-ui/angular/collection` with the same item shape and default value. |
| `RootProvider` | `useFieldset` return value | Fieldset primitive plus two fields | None visible in Storybook | Angular retains a non-rendered disabled helper for existing specs; visible story surface matches React. |
| `WithCheckbox` | Hard-coded template controls | Two checkbox options, first checked | Native checkbox state changes interactively | Deferred primitive gap: no Angular Ark Checkbox API exists. |
| `WithField` | Hard-coded template fields | First and last name fields, helper text on first | None | No change. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Fieldset'` with no tags, args, argTypes, or parameters.
- Decorator differences: React re-exports example components directly. Angular uses one `moduleMetadata` decorator per story to import the standalone example component.
- Per-story decorators / args / controls: No per-story args or controls in either stack. Angular export order now follows React: `Basic`, `Disabled`, `Invalid`, `PhoneInput`, `RootProvider`, `WithCheckbox`, `WithField`.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Fieldset root | `fieldset.Root` | `[arkFieldsetRoot]`, `[arkFieldsetRootProvider]` | Angular faded the entire disabled root; React leaves root opacity alone. | Removed root-level disabled opacity. |
| Legend | `fieldset.Legend` | `[arkFieldsetLegend]` | Already matched typography and disabled state. | No change. |
| Helper text | `fieldset.HelperText` | `[arkFieldsetHelperText]` | Angular lacked disabled visual state. | Added disabled opacity/filter. |
| Error text | `fieldset.ErrorText` | `[arkFieldsetErrorText]` | Angular lacked disabled visual state. | Added disabled opacity/filter. |
| Field controls | `field.*` | `[arkFieldRoot]`, `[arkFieldLabel]`, `[arkFieldInput]`, helper/error selectors | Already mirrored the React field module for used parts. | No change. |
| Select trigger/content/items | `select.*` | `[arkSelect*]` | Angular was missing some placeholder, disabled, invalid, scrollbar, and animation selectors; icon was text-only. | Added selectors and replaced the indicator with an inline SVG. |
| Checkbox controls | `checkbox.*` | `.checkbox-*` | Angular had no story or local styles. | Added native checkbox story styling to match the visible React demo. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story exports | Missing `WithCheckbox`; `RootProvider` and `WithField` order differed. | `packages/react/src/components/fieldset/fieldset.stories.tsx` | `packages/angular/fieldset/fieldset.stories.ts` | Added `WithCheckbox` and reordered exports. |
| RootProvider example | Angular rendered an extra toggle button and wrapper. | `packages/react/src/components/fieldset/examples/root-provider.tsx` | `packages/angular/fieldset/examples/root-provider.ts` | Removed the visible wrapper and toggle button. |
| Checkbox example | Angular had no equivalent story. | `packages/react/src/components/fieldset/examples/with-checkbox.tsx` | `packages/angular/fieldset/examples/with-checkbox.ts` | Added a matching visible example with native checkbox controls. |
| Demo styling | Select and checkbox visual contracts were incomplete. | `.storybook/modules/select.module.css`, `.storybook/modules/checkbox.module.css` | `packages/angular/fieldset/fieldset-example-styles.ts` | Added missing selectors and checkbox classes. |

## Implementation Plan
1. Add the missing Angular `WithCheckbox` example and story export.
2. Reorder Angular story exports to match React.
3. Remove the visible Angular-only RootProvider toggle surface while preserving existing spec compatibility.
4. Align demo styles for fieldset disabled parts, select states, and checkbox controls.
5. Run focused verification and `git diff --check`.

## Deferred (component-level work)
- Add or migrate an Angular checkbox primitive if full API-level parity with React `@ark-ui/react/checkbox` is required. The story currently uses native checkbox controls to match the visible fieldset demo without changing component implementation.

## Verification
- [x] Story-related specs: `bun run --cwd packages/angular test:ci fieldset` passed with 1 file and 13 tests.
- [x] Diff check: `git diff --check -- packages/angular/fieldset/fieldset.stories.ts packages/angular/fieldset/examples/phone-input.ts packages/angular/fieldset/examples/root-provider.ts packages/angular/fieldset/fieldset-example-styles.ts` passed; `git diff --no-index --check -- /dev/null packages/angular/fieldset/examples/with-checkbox.ts` produced no whitespace warnings.
- [ ] Typecheck: `bun run --cwd packages/angular typecheck` failed before fieldset verification on unrelated missing Combobox example imports: `./examples/creatable`, `./examples/rehydrate-value`, and `./examples/virtualized`.
- [ ] Storybook startup: `bun run --cwd packages/angular storybook` prompted because port 6006 was already in use. Retried with `bun run --cwd packages/angular storybook -- --port 6007 --ci`; preview build failed on the unrelated missing `packages/angular/combobox/examples/virtualized` import.
- [ ] Visual check of each story: Not completed because Angular Storybook startup is currently blocked by the unrelated Combobox story import failure.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align fieldset story with react parity`
