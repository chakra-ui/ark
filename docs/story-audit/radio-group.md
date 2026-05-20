# Radio Group Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/radio-group/radio-group.stories.ts`
- Angular examples: `packages/angular/radio-group/examples/basic.ts`, `controlled.ts`, `disabled.ts`, `initial-value.ts`, `orientation.ts`, `root-provider.ts`, `with-fieldset.ts`, plus unused empty `icons.ts`
- Angular styles: `packages/angular/radio-group/radio-group-example-styles.ts`, `packages/angular/fieldset/fieldset-example-styles.ts`
- React story: `packages/react/src/components/radio-group/radio-group.stories.tsx`
- React examples: `packages/react/src/components/radio-group/examples/basic.tsx`, `controlled.tsx`, `disabled.tsx`, `initial-value.tsx`, `orientation.tsx`, `root-provider.tsx`, `with-fieldset.tsx`
- React styles: `.storybook/modules/radio-group.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/fieldset.module.css`, `.storybook/modules/utilities.css`

## Summary
- Status: Story inventory, example data, story ordering, and framework state variants match React. Styling is mostly translated correctly, with drift in utility/button styles used by the orientation and root-provider demos.
- Highest-risk gaps: Root-provider button background/spacing differs from React, local `.stack`/`.hstack` values do not match the React global utility classes, and the Angular examples folder has an unused empty file with no React counterpart.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Yes | Yes | Same `['React', 'Solid', 'Vue']`, label, `defaultValue="React"`, item/control/text/hidden-input structure. |
| `Controlled` | Yes | Yes | React uses `useState<string \| null>` with `onValueChange`; Angular uses `signal<string \| null>` with `[(value)]`, which is Angular-idiomatic model parity. |
| `Disabled` | Yes | Yes | Same disabled root with `defaultValue="React"`. |
| `InitialValue` | Yes | Yes | Same `defaultValue="Solid"`. |
| `Orientation` | Yes | Yes | Same horizontal root and `hstack` wrapper; local Angular `hstack` style needs alignment. |
| `RootProvider` | Yes | Yes | Same hook/provider pattern and "Set to Solid" button; local Angular button style needs alignment. |
| `WithFieldset` | Yes | Yes | Same fieldset root, legend, helper text, error text, and radio group items. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded local array | `string[]`, length 3 | None | No divergence. |
| `Controlled` | Hard-coded local array plus component state | `string[]`, length 3; nullable selected value | User event updates local state | No user-visible divergence; Angular uses `signal` and `[(value)]`. |
| `Disabled` | Hard-coded local array | `string[]`, length 3 | None | No divergence. |
| `InitialValue` | Hard-coded local array | `string[]`, length 3 | None | No divergence. |
| `Orientation` | Hard-coded local array | `string[]`, length 3 | None | No data divergence. |
| `RootProvider` | Hard-coded local array plus `useRadioGroup` | `string[]`, length 3; provider API | Button sets value to `Solid` | No behavior divergence; Angular calls `radioGroup.api().setValue('Solid')`. |
| `WithFieldset` | Hard-coded local array | `string[]`, length 3 | None | No divergence. |

## Sections / Structure
- Meta differences: Both stories only set `title: 'Components / Radio Group'`.
- Decorator differences: React re-exports example components directly. Angular wraps each standalone example with `moduleMetadata` and a render template, matching existing Angular Storybook conventions.
- Per-story decorators / args / controls: No args, controls, parameters, or per-story layout decorators exist in either story. Angular decorator boilerplate is framework-specific and requires no change.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` from `radio-group.module.css` | `[arkRadioGroup]`, `[arkRadioGroupRootProvider]` | Matches. | No change. |
| Label | `.Label` | `[arkRadioGroupLabel]` | Matches. | No change. |
| Item | `.Item` | `[arkRadioGroupItem]` | Matches. | No change. |
| Item control | `.ItemControl` | `[arkRadioGroupItemControl]` | Matches. | No change. |
| Item text | `.ItemText` | `[arkRadioGroupItemText]` | Matches. | No change. |
| Indicator | `.Indicator` | `[arkRadioGroupIndicator]` | Matches. | No change. |
| Orientation wrapper | `.hstack` from `utilities.css` | `.hstack` in radio-group example styles | Angular uses `gap: 0.75rem`; React uses row direction and `gap: 1rem`. | Align Angular `.hstack`. |
| Root-provider wrapper | `.stack` from `utilities.css` | `.stack` in radio-group example styles | Angular uses `gap: 0.75rem` and omits `align-items: flex-start`; React uses `gap: 1rem` and `align-items: flex-start`. | Align Angular `.stack`. |
| Root-provider button | `.Root` from `button.module.css` | `.button` in radio-group example styles | Angular uses popover background, fallbacks, `align-self`, and cursor styles not present in React. | Align Angular `.button` with React button CSS subset. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Styling | Utility layout classes drift from React Storybook utilities. | `.storybook/modules/utilities.css` | `packages/angular/radio-group/radio-group-example-styles.ts` | Update `.stack` and `.hstack`. |
| Styling | Root-provider button differs from React button module. | `.storybook/modules/button.module.css` | `packages/angular/radio-group/radio-group-example-styles.ts` | Update `.button` styles. |
| Examples | Empty `icons.ts` has no React counterpart and is not exported as a story. | `packages/react/src/components/radio-group/examples/` | `packages/angular/radio-group/examples/icons.ts` | Delete unused file. |

## Implementation Plan
1. Align Angular story styles for `.stack`, `.hstack`, and `.button`.
2. Delete the unused empty `icons.ts` example file.
3. Run story-adjacent verification through the radio-group spec, Angular typecheck, and `git diff --check`.

## Deferred (component-level work)
- None. The component-level test additions are tracked in `docs/audit/radio-group.md` and do not require shared package edits.

## Verification
- [ ] Storybook startup: Not run; narrow verification used Angular typecheck/build and radio-group specs.
- [x] Visual check of each story: Textual style comparison completed against `.storybook/modules/radio-group.module.css`, `.storybook/modules/button.module.css`, and `.storybook/modules/utilities.css`; fixed root-provider and orientation style drift.
- [x] Story-related specs (if any): `bun run --cwd packages/angular test:ci radio-group/radio-group.spec.ts` passed with 16 tests.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
