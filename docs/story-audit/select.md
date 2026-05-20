# Select Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/select/select.stories.ts`
- Angular examples: `packages/angular/select/examples/*.ts`
- Angular styles: `packages/angular/select/select-example-styles.ts`
- React story: `packages/react/src/components/select/select.stories.tsx`
- React examples: `packages/react/src/components/select/examples/*.tsx`
- React styles: `.storybook/modules/select.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/field.module.css`

## Summary
- Status: Fixed. Angular Select now matches the React public story inventory/order and the audited visible data/copy/styling gaps are resolved.
- Highest-risk gaps fixed: Angular no longer exports the extra `DynamicItems` story; `Async` is first; `Multiple` and `RootProvider` use React's framework data; `WithField` no longer forces invalid state and now has field demo styling; form submit and async status rows now match the React-visible surface more closely.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Async | Yes, first | Yes, first | Fixed ordering. |
| Basic | Yes | Yes | Fixed placeholder copy to React `Select`. |
| Controlled | Yes | Yes | Fixed placeholder casing. |
| FormLibrary | Yes | Yes | Angular uses reactive forms instead of react-hook-form; visible submit surface now alerts like React. |
| FullyControlled | Yes | Yes | Data and state shape match. |
| Grouping | Yes | Yes | Grouped data matches. |
| LazyMount | Yes | Yes | Angular uses `ArkPresenceComponent` to express lazy mount/unmount behavior. |
| MaxSelected | Yes | Yes | Selection cap behavior matches. |
| Multiple | Yes | Yes | Fixed to use framework data and `Frameworks` group label. |
| Overflow | Yes | Yes | Data and positioning match. |
| ReactiveCollection | Yes | Yes | Signal-based Angular state matches React derived collection behavior. |
| RootProvider | Yes | Yes | Fixed to use framework data, clear trigger, group label, and JSON output. |
| SelectAll | Yes | Yes | Behavior matches; button styling should follow React shared button module. |
| SelectOnHighlight | Yes | Yes | Behavior matches. |
| WithField | Yes | Yes | Fixed invalid state, data shape, placeholder, and field styles. |
| DynamicItems | No story export | No story export | React has an example file but does not export it from `select.stories.tsx`; Angular public story export removed. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Async | Local `loadData()` promise | `string[]`, 6 frameworks | 500ms timer, loading/error states | Fixed status row styling. |
| Basic | Local collection | `{ label, value }[]`, 4 frameworks | Static | Fixed placeholder copy. |
| Controlled | Local collection | `{ label, value, disabled? }[]`, 4 frameworks | Controlled value state | Fixed placeholder casing. |
| FormLibrary | Local collection plus framework form library | `string[]`, 4 frameworks | Submit handler | Angular uses reactive forms, which is framework-idiomatic; visible submit behavior now matches React alert. |
| FullyControlled | Local collection | `string[]`, 4 frameworks | Controlled value state seeded to `['React']` | No behavior gap. |
| Grouping | Local grouped collection | `{ label, value, type }[]`, 5 items grouped by `type` | Static | No behavior gap. |
| LazyMount | Local collection | `string[]`, 6 frameworks | Lazy mount/unmount when open | Angular uses presence wrapper to model React root props. |
| MaxSelected | Local base array | Derived `{ label, value, disabled }[]`, 4 frameworks | Disabled state recomputes from value | No behavior gap. |
| Multiple | Local collection | `{ label, value, disabled? }[]`, 4 frameworks | Static multiple selection | Fixed dataset, label, placeholder, and group label. |
| Overflow | Local generated list | `Name 1` through `Name 14` | Static | No behavior gap. |
| ReactiveCollection | Local base array | Derived labels suffixed by counter | Plus/minus state changes collection labels | No behavior gap. |
| RootProvider | Local collection passed to `useSelect` | `{ label, value }[]`, 4 frameworks | Root provider API state | Fixed dataset, copy, clear trigger, group label, and output. |
| SelectAll | Local collection | `string[]`, 4 frameworks | Context API selects all then closes | No behavior gap. |
| SelectOnHighlight | Local collection passed to `useSelect` | `string[]`, 4 frameworks | Highlight handler selects highlighted value | No behavior gap. |
| WithField | Local collection | `string[]`, 4 frameworks | Static field integration | Fixed data shape and invalid state. |
| DynamicItems | Local signal/state array | `string[]`, 4 frameworks plus appended Angular | Add button mutates list | Not exported by React story; remove Angular story export. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Select'`; neither sets args, argTypes, tags, decorators, or parameters at the meta level.
- Decorator differences: Angular uses `moduleMetadata({ imports: [...] })` per story to load standalone examples; React re-exports example functions directly.
- Per-story decorators / args / controls: No args or controls on either side. Angular story ordering must match React exactly.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Select root/label/control/trigger/content/items | `.Root`, `.Label`, `.Control`, `.Trigger`, `.Content`, `.Item` | Ark attribute selectors in `selectExampleStyles` | Mostly aligned | Keep existing translated selectors. |
| Loading/error rows | `.Item` | `.select-status` | Fixed | Added `.select-status` matching item styling. |
| Example buttons | `button.Root` | `.select-button` | Fixed | Expanded `.select-button` to match shared button module. |
| Field wrapper | `field.Root`, `field.HelperText`, `field.ErrorText` | Ark field selectors in `selectExampleStyles` | Fixed | Added Ark field selectors. |
| Root provider output | Unstyled `<output>` | Unstyled `<output>` | Fixed | Removed output class and render JSON text. |
| Icons | Lucide SVG icons | Text glyphs (`▾`, `×`, `✓`, `+`, `-`) | Visual implementation differs but semantic placement is the same. | No change in this pass; keep existing local Angular convention. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | Extra `DynamicItems`, order mismatch | `select.stories.tsx` exports 15 stories with `Async` first | `select.stories.ts` | Reorder exports and remove `DynamicItems` export/import. |
| Basic | Placeholder copy differs | `placeholder="Select"` | `examples/basic.ts` | Change visible placeholder text to `Select`. |
| Controlled | Placeholder casing differs | `Select a Framework` | `examples/controlled.ts` | Match copy casing. |
| Multiple | Dataset and grouping differ | Framework options with disabled Svelte, `Framework` label, `Frameworks` group | `examples/multiple.ts` | Use framework collection and item group. |
| RootProvider | Dataset/copy/output differ | Framework options, clear trigger, JSON output | `examples/root-provider.ts` | Match collection, label, placeholder, clear trigger, group, output. |
| FormLibrary | Submit output visible in Angular | React calls `alert(JSON.stringify(data))` | `examples/form-library.ts` | Use alert and remove persistent output. |
| WithField | Forced invalid state and object data | Plain field root, string collection | `examples/with-field.ts` | Remove invalid state, use string collection, match placeholder. |
| Styling | Button, field, and status styles differ | React button/field/select modules | `select-example-styles.ts` | Add translated styles. |

## Implementation Plan
1. Reorder `select.stories.ts` exports to match React and remove public `DynamicItems`.
2. Patch example data/copy for Basic, Controlled, Multiple, RootProvider, FormLibrary, and WithField.
3. Patch `selectExampleStyles` for button parity, field helper/error styles, and async status rows.
4. Run focused Select spec, Angular typecheck, Storybook startup, and whitespace checks; record results.

## Deferred (component-level work)
- None identified.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6012 --ci` compiled but failed to bind `6012` with `EADDRINUSE`; retry `bun run --cwd packages/angular storybook -- --port 6201 --ci` reached `Storybook ready!` at `http://localhost:6201/`, then was stopped.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci select/select.spec.ts` passed, 1 file / 19 tests.
- [x] Typecheck: `bunx tsc -p packages/angular/tsconfig.json --noEmit` passed. Full `bun run --cwd packages/angular typecheck` failed in unrelated `src/accordion/accordion.spec.ts` references to missing `AccordionRootProviderExample.valueLabel`.
- [x] Whitespace: `git diff --check` passed. `git diff --no-index --check /dev/null docs/story-audit/select.md` produced no whitespace warnings.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align select story with react parity`
