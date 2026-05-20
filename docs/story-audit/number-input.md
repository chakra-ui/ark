# Number Input Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/number-input/number-input.stories.ts`
- Angular examples: `packages/angular/number-input/examples/`
- Angular styles: `packages/angular/number-input/number-input-example-styles.ts`
- React story: `packages/react/src/components/number-input/number-input.stories.tsx`
- React examples: `packages/react/src/components/number-input/examples/`
- React styles: `.storybook/modules/number-input.module.css`, `.storybook/modules/field.module.css`

## Summary
- Status: Fixed; Angular story exports, ordering, `WithField` copy/state, and composed field styling now match the React story surface.
- Highest-risk gaps: None remaining in the number-input story surface.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Yes | Yes | Same basic root, label, control, input, increment/decrement triggers, and icons. |
| `Formatting` | Yes | Yes | Same USD currency `formatOptions`. |
| `FractionDigits` | Yes | Yes | Same `defaultValue="1.00"` and min/max fraction digits. |
| `MinMax` | Yes | Yes | Same `min=0` and `max=10`. |
| `MouseWheel` | Yes | Yes | Same mouse-wheel enablement. |
| `Context` | Yes | Yes | Same context value display; Angular reads `api().valueAsNumber`. |
| `RootProvider` | Yes | Yes | Same root-provider surface and `valueAsNumber` output; Angular uses `useNumberInput` with explicit default value. |
| `Scrubber` | Yes | Yes | Same scrubber icon, default value, and input scrubber marker. |
| `WithField` | Yes | Yes | Aligned with React. |
| `Controlled` | No | Removed | Extra Angular-only story removed from Storybook surface for React parity. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Inline component markup | Single number input with label/control/input/two triggers | None | No data divergence. |
| `Formatting` | Inline `formatOptions` | Currency formatter `{ style: 'currency', currency: 'USD' }` | None | No data divergence. |
| `FractionDigits` | Inline `defaultValue` and `formatOptions` | `defaultValue="1.00"`, min 2 and max 3 fraction digits | None | No data divergence. |
| `MinMax` | Inline bounds | `min=0`, `max=10` | None | No data divergence. |
| `MouseWheel` | Inline boolean prop/attribute | Mouse-wheel-enabled number input | None | No data divergence. |
| `Context` | Number input context API | Renders `valueAsNumber` in label | None | Angular reads from template export instead of React render prop. No change; framework-idiomatic. |
| `RootProvider` | `useNumberInput` helper | Hook/service-backed API plus `valueAsNumber` output | None | Angular seeds `defaultValue: '0'`; React uses hook defaults. Acceptable unless behavior visibly diverges. |
| `Scrubber` | Inline default value and scrubber marker | `defaultValue="32"`, scrubber icon, input with `data-has-scrubber` | None | No data divergence. |
| `WithField` | Inline field composition | Field root, number input, helper text, error text | None | Fixed to match React copy and non-invalid field state. |
| `Controlled` | Angular-only local signal | `signal<string \| undefined>('5')` bound to `[(value)]` | None | Removed because there is no React story counterpart. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Number Input'`; neither has args, argTypes, decorators, tags, or parameters.
- Decorator differences: React re-exports story components directly. Angular uses per-story `moduleMetadata` imports and render templates for standalone examples.
- Per-story decorators / args / controls: Angular stories have no args or controls; all rendering is example-component driven. Story order now matches React: `Basic`, `Formatting`, `FractionDigits`, `MinMax`, `MouseWheel`, `Context`, `RootProvider`, `Scrubber`, `WithField`.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkNumberInputRoot], [arkNumberInputRootProvider]` | Matches. | No change. |
| Label | `.Label` | `[arkNumberInputLabel]` | Matches. | No change. |
| Control | `.Control` | `[arkNumberInputControl]` | Matches. | No change. |
| Input | `.Input` | `[arkNumberInputInput]` | Matches. | No change. |
| Trigger group | `.TriggerGroup` | `.trigger-group` | Matches. | No change. |
| Triggers | `.IncrementTrigger`, `.DecrementTrigger` | trigger directives | Matches visual states. | No change. |
| Scrubber | `.Scrubber` | `[arkNumberInputScrubber]` | Matches. | No change. |
| Value text | `.ValueText` | `[arkNumberInputValueText]` | Matches available selector; not used by these stories. | No change. |
| Field root/helper/error | `field.Root`, `field.HelperText`, `field.ErrorText` | `[arkFieldRoot]`, `[arkFieldHelperText]`, `[arkFieldErrorText]` | Fixed. | Added field-root/helper/error styles mirroring React field module. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story list | Angular included `Controlled`; React does not. | `number-input.stories.tsx` exports no `Controlled`. | `number-input.stories.ts`, `examples/controlled.ts` | Fixed: removed the Angular-only story and unused example file. |
| Story order | Angular placed `WithField` before `RootProvider`/`Scrubber`. | React exports `RootProvider`, `Scrubber`, then `WithField`. | `number-input.stories.ts` | Fixed: reordered Angular exports/imports to match React. |
| `WithField` state | Angular forced invalid field state. | React `WithField` uses plain `Field.Root`. | `examples/with-field.ts` | Fixed: removed `[invalid]="true"`. |
| `WithField` copy | Angular said `Quantity`, `Additional info`, `Error info`. | React says `Label`, `Additional Info`, `Error Info`. | `examples/with-field.ts` | Fixed: matched React text exactly. |
| `WithField` styling | Angular lacked field root/helper/error selectors in the number-input style block. | `.storybook/modules/field.module.css` | `number-input-example-styles.ts` | Fixed: added field selectors used by the composed story. |

## Implementation Plan
1. Remove `Controlled` from `number-input.stories.ts` and delete the unused Angular-only example file.
2. Reorder Angular story imports and exports to match the React story order.
3. Align `WithField` state and copy with the React example.
4. Add field helper/error/root styles to `number-input-example-styles.ts`.
5. Run focused tests/typecheck/storybook startup as available, then `git diff --check`.

## Deferred (component-level work)
- None identified.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6011 --ci` attempted. Storybook repeatedly compiled, then preview failed on unrelated `packages/angular/combobox/examples/highlight-matching-text.ts` importing `@ark-ui/angular/highlight` where the package export target is missing. Visual review deferred because Storybook did not serve cleanly.
- [ ] Visual check of each story: Not completed; blocked by the unrelated Storybook compile failure above.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci number-input/number-input.spec.ts` passed, 1 file / 16 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and `forms isolation: ok`.
- [x] Whitespace: `git diff --check -- packages/angular/number-input/number-input.stories.ts packages/angular/number-input/examples/with-field.ts packages/angular/number-input/number-input-example-styles.ts packages/angular/number-input/examples/controlled.ts` passed; ignored audit file also passed via `git diff --no-index --check /dev/null docs/story-audit/number-input.md`.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align number-input story with react parity`
