# Segment Group Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/segment-group/segment-group.stories.ts`
- Angular examples: `packages/angular/segment-group/examples/basic.ts`, `controlled.ts`, `disabled.ts`, `root-provider.ts`, `conditional.ts`
- Angular styles: `packages/angular/segment-group/segment-group-example-styles.ts`
- React story: `packages/react/src/components/segment-group/segment-group.stories.tsx`
- React examples: `packages/react/src/components/segment-group/examples/basic.tsx`, `controlled.tsx`, `disabled.tsx`, `root-provider.tsx`, `conditional.tsx`
- React styles: `.storybook/modules/segment-group.module.css`, `.storybook/modules/button.module.css` for the Conditional toggle button

## Summary
- Status: Story inventory, example data, conditional rendering, controlled state, RootProvider demo, and translated styles already match the React story surface.
- Highest-risk gaps: No story-only gaps found. The discovered component-level DOM/anatomy scope mismatch is fixed in the segment-group component files and tracked in `docs/audit/segment-group.md`.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Exported from `./examples/basic` | Story imports `SegmentGroupBasicExample` | Matching story order and framework list: React, Solid, Svelte, Vue. |
| Controlled | Exported from `./examples/controlled` | Story imports `SegmentGroupControlledExample` | React uses `useState<string \| null>(null)`; Angular uses `signal<string \| null>(null)` with `[(value)]`. |
| Disabled | Exported from `./examples/disabled` | Story imports `SegmentGroupDisabledExample` | Both disable the Svelte item only. |
| RootProvider | Exported from `./examples/root-provider` | Story imports `SegmentGroupRootProviderExample` | Both create a segment group API with default value React and render `selected:` output. |
| Conditional | Exported from `./examples/conditional` | Story imports `SegmentGroupConditionalExample` | Both start hidden, toggle with Show/Hide, then render the same default group. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Local hard-coded `frameworks` array | `string[]` length 4 | None | No divergence. |
| Controlled | Local hard-coded `frameworks` array plus local selected state | `string[]` length 4, nullable selected value | State changes on item selection | Framework-idiomatic state (`useState` vs `signal`), no behavioral divergence. |
| Disabled | Local hard-coded `frameworks` array | `string[]` length 4, disables where value is `Svelte` | None | No divergence. |
| RootProvider | Local hard-coded `frameworks` array plus `useSegmentGroup` | `string[]` length 4, API default value `React` | API value changes on item selection | Angular passes `context: () => ({ defaultValue: 'React' })` because the Angular hook expects a context factory. |
| Conditional | Local hard-coded `frameworks` array plus local `show` state | `string[]` length 4, boolean visible state | State toggles with button click | Framework-idiomatic state (`useState` vs `signal`), no behavioral divergence. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Segment Group'`; neither defines args, argTypes, tags, parameters, or global decorators.
- Decorator differences: React re-exports component functions directly; Angular uses per-story `moduleMetadata` imports and simple render templates, matching Angular Storybook conventions.
- Per-story decorators / args / controls: Angular stories have no args or controls, matching React's export-only story surface.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root / RootProvider | `.Root` | `[arkSegmentGroupRoot]`, `[arkSegmentGroupRootProvider]` | Visual rules match: inline flex, neutral subtle background, radius, padding, inset border, disabled opacity/filter. | No story change. |
| Label | `.Label` | `[arkSegmentGroupLabel]` | Rules match, though no current React story renders `Label`. | No story change. |
| Item | `.Item` | `[arkSegmentGroupItem]` | Rules match for layout, checked color, disabled cursor/opacity, focus ring, and vertical orientation. | No story change. |
| ItemText | `.ItemText` | `[arkSegmentGroupItemText]` | Rules match relative positioning and z-index. | No story change. |
| ItemControl | `.ItemControl` | `[arkSegmentGroupItemControl]` | Rules match hidden control display. | No story change. |
| Indicator | `.Indicator` | `[arkSegmentGroupIndicator]` | Rules match positioning, CSS variables, radius, shadow, and transitions. | No story change. |
| Conditional button | `button.Root` from `button.module.css` | `.segment-group-toggle-button` | Angular local button style approximates the shared demo button. | No story change; shared button CSS is not in this worker's allowed edit scope. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | None. | `segment-group.stories.tsx` | `segment-group.stories.ts` | No change. |
| Example data / behavior | None. | React examples directory | Angular examples directory | No change. |
| Styling | None requiring story changes. | `.storybook/modules/segment-group.module.css` | `segment-group-example-styles.ts` | No change. |
| Component-level DOM attrs | Angular visible parts render underlying radio-group-derived scope before the component fix. | React visible parts merge renamed segment-group anatomy attrs. | Angular directives in `packages/angular/segment-group/` | Deferred to component audit/fix in `docs/audit/segment-group.md`. |

## Implementation Plan
1. Do not change story exports or example components; they already match React.
2. Apply the component-level anatomy/data-attribute fix tracked in `docs/audit/segment-group.md`.
3. Run the focused segment-group spec as story smoke coverage imports every example.

## Deferred (component-level work)
- None. The component-level anatomy/data-attribute mismatch found during the story audit was fixed in `packages/angular/segment-group/`.

## Verification
- [ ] Storybook startup: Not run; story surface unchanged.
- [ ] Visual check of each story: Not run; story surface unchanged.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci segment-group/segment-group.spec.ts` passed: 1 file, 11 tests. This spec smoke-renders every Segment Group story example.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
