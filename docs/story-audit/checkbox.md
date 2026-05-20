# Checkbox Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/checkbox/checkbox.stories.ts`
- Angular examples: `packages/angular/checkbox/examples/*.ts`
- Angular styles: `packages/angular/checkbox/checkbox-example-styles.ts`, plus shared `packages/angular/field/field-example-styles.ts` and `packages/angular/fieldset/fieldset-example-styles.ts`
- React story: `packages/react/src/components/checkbox/checkbox.stories.tsx`
- React examples: `packages/react/src/components/checkbox/examples/*.tsx`
- React styles: `.storybook/modules/checkbox.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/fieldset.module.css`

## Summary
- Status: Story inventory and ordering match React. Example data shapes and state variants match React, with Angular signal/model syntax replacing React state callbacks.
- Highest-risk gaps: Checkbox-local button styles used in `RootProvider`, `GroupWithForm`, and `WithForm` are missing React button hover/focus/disabled states. `WithField` inherits a shared field style gap that is outside this worker's edit scope.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Yes | Yes | Same root/control/indicator/label/hidden input structure. |
| Controlled | Yes | Yes | React uses `useState`; Angular uses `[(checked)]` signal model. |
| DefaultChecked | Yes | Yes | Angular uses bare `defaultChecked` boolean attribute, matching Angular boolean transform policy. |
| Disabled | Yes | Yes | Same disabled root state. |
| Group | Yes | Yes | Same three-item framework data and default `react` value. |
| GroupControlled | Yes | Yes | Same output and controlled group value. |
| GroupProvider | Yes | Yes | Same default group helper/provider pattern with Angular `useCheckboxGroup({ context })`. |
| GroupWithForm | Yes | Yes | Same form submit behavior and data. |
| GroupWithInvalid | Yes | Yes | Same invalid group state. |
| GroupWithMaxSelected | Yes | Yes | Same four-item data and max of 2. |
| GroupWithSelectAll | Yes | Yes | Same select-all, indeterminate, nested group, and selected output. |
| Indeterminate | Yes | Yes | Same checked and indeterminate indicators. |
| Context | Yes | Yes | Angular template exposes the API signal instead of a React render function object. |
| RootProvider | Yes | Yes | Same hook/provider plus external Check/Uncheck button. |
| WithField | Yes | Yes | Same field helper/error content. Shared `data-inline` width styling differs outside checkbox scope. |
| GroupWithFieldset | Yes | Yes | Same fieldset legend/helper/group content. |
| WithForm | Yes | Yes | Same terms checkbox, value, submit button, and submit logging. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic, DefaultChecked, Disabled, Indeterminate, Context, RootProvider, WithField, WithForm | Hard-coded template content | Single checkbox with label and hidden input | No async/random values | No data divergence. |
| Controlled | Component state | `CheckboxCheckedState` initialized to `true` | No async/random values | Angular uses a signal with `[(checked)]`; React uses `useState` and `onCheckedChange`. |
| Group, GroupControlled, GroupProvider, GroupWithForm, GroupWithInvalid, GroupWithFieldset | Local `items` array | Three `{ label, value }` items: React/Solid/Vue | No async/random values | No data divergence. |
| GroupWithMaxSelected | Local `items` array | Four `{ label, value }` items: React/Solid/Vue/Svelte | No async/random values | No data divergence. |
| GroupWithSelectAll | Local `items` array and component state | Three items plus derived all-selected/indeterminate state | No async/random values | Angular uses computed signals; behavior matches React. |

## Sections / Structure
- Meta differences: None. Both stories use `title: 'Components / Checkbox'`.
- Decorator differences: React re-exports examples directly. Angular wraps each standalone example with `moduleMetadata({ imports: [...] })` and renders its selector, matching neighboring Angular story conventions.
- Per-story decorators / args / controls: Neither stack defines args, argTypes, controls, tags, or special parameters for checkbox stories.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkCheckbox]`, `[arkCheckboxRootProvider]` | None. | No change. |
| Label | `.Label` | `[arkCheckboxLabel]` | None. | No change. |
| Control | `.Control` | `[arkCheckboxControl]` | None. | No change. |
| Indicator | `.Indicator` | `[arkCheckboxIndicator]` | None. | No change. |
| Group | `.Group` | `[arkCheckboxGroup]`, `[arkCheckboxGroupProvider]` | None. | No change. |
| Demo button | `.storybook/modules/button.module.css .Root` | `.checkbox-demo-button` | Missing hover/focus/disabled transitions and solid hover/focus treatment. | Update checkbox-local styles. |
| Field inline root | `.storybook/modules/field.module.css .Root[data-inline]` | `packages/angular/field/field-example-styles.ts` | Angular shared field styles do not set `width: auto` for inline field roots. | Deferred/report only; outside checkbox edit scope. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | No missing or extra checkbox stories. | `checkbox.stories.tsx` | `checkbox.stories.ts` | No change. |
| Example data | No divergent item labels, values, defaults, names, or form values. | `packages/react/src/components/checkbox/examples/*` | `packages/angular/checkbox/examples/*` | No change. |
| Example behavior | Controlled and provider examples use Angular signal equivalents. | `controlled.tsx`, `group-controlled.tsx`, `root-provider.tsx` | `controlled.ts`, `group-controlled.ts`, `root-provider.ts` | No change. |
| Styling | Checkbox demo button states are less complete than React's shared button module. | `.storybook/modules/button.module.css` | `checkbox-example-styles.ts` | Add the missing button state rules. |
| Shared styling | Field inline width parity lives in shared field example styles. | `.storybook/modules/field.module.css` | `packages/angular/field/field-example-styles.ts` | Deferred/report only. |

## Implementation Plan
1. Update `.checkbox-demo-button` in checkbox example styles to mirror React button states used by checkbox demos.
2. Rely on existing checkbox example render tests plus the component audit's focused specs for behavior verification.
3. Run the checkbox spec and `git diff --check`.

## Deferred (component-level work)
- None.
- Shared style follow-up: add `[arkFieldRoot][data-inline], [arkFieldRootProvider][data-inline] { width: auto; }` to `packages/angular/field/field-example-styles.ts` in a field/shared-style change.

## Verification
- [ ] Storybook startup: Not run; source/story inventory comparison plus example render specs planned.
- [x] Visual check of each story: Source-level CSS comparison completed against React checkbox/button/field/fieldset modules; no browser visual pass.
- [x] Story-related specs (if any): `bun run --cwd packages/angular test:ci checkbox/checkbox.spec.ts` passed (32 tests, including example render coverage).

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
