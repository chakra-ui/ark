# Toggle Group Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/toggle-group/toggle-group.stories.ts`
- Angular examples: `packages/angular/toggle-group/examples/`
- Angular styles: `packages/angular/toggle-group/toggle-group-example-styles.ts`
- React story: `packages/react/src/components/toggle-group/toggle-group.stories.tsx`
- React examples: `packages/react/src/components/toggle-group/examples/`
- React styles: `.storybook/modules/toggle-group.module.css`

## Summary
- Status: Story surface matches React.
- Highest-risk gaps: None in story inventory or demo styling.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Yes | Yes | Same default `left` value and alignment item set. |
| Controlled | Yes | Yes | Angular uses `[(value)]` model equivalent to React `value`/`onValueChange`. |
| Multiple | Yes | Yes | Same `multiple` root and bold/italic/underline item set. |
| RootProvider | Yes | Yes | Angular `useToggleGroup` plus `[arkToggleGroupRootProvider]` matches React root provider. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Static template | Four alignment items, default `['left']` | None | Angular uses local icon components instead of `lucide-react`. |
| Controlled | Component-local signal/state | Four alignment items, value array | User interaction | Framework-idiomatic state only. |
| Multiple | Static template | Three formatting items, default `['bold']` | User interaction | Angular uses local icon components instead of `lucide-react`. |
| RootProvider | `useToggleGroup` hook/helper | Four alignment items, default `['left']` | User interaction | Framework-idiomatic provider binding only. |

## Sections / Structure
- Meta differences: Both use `title: 'Components / Toggle Group'`.
- Decorator differences: Angular imports standalone examples through `moduleMetadata`; React re-exports examples directly.
- Per-story decorators / args / controls: No args or controls in either story surface.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkToggleGroup], [arkToggleGroupRootProvider]` | None | No change. |
| Item | `.Item` | `[arkToggleGroupItem]` | None | No change. |
| Item icons | `.Item svg` | `[arkToggleGroupItem] svg` | None | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | None | `toggle-group.stories.tsx` | `toggle-group.stories.ts` | No change. |
| Example data | None | `examples/` | `examples/` | No change. |
| Styling | None | `.storybook/modules/toggle-group.module.css` | `toggle-group-example-styles.ts` | No change. |

## Implementation Plan
1. Keep story exports, examples, and styles unchanged because they match React.
2. Record component-level test coverage additions in `docs/audit/toggle-group.md`.

## Deferred (component-level work)
- None.

## Verification
- [ ] Storybook startup: Not run; story surface unchanged.
- [x] Visual check of each story: Source-level comparison confirmed all React stories have Angular equivalents with matching example structure and styles.
- [x] Story-related specs (if any): `bun run --cwd packages/angular test:ci toggle-group/toggle-group.spec.ts` passed, 11 tests.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
