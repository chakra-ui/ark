# Switch Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/switch/switch.stories.ts`
- Angular examples: `packages/angular/switch/examples/`
- Angular styles: `packages/angular/switch/switch-example-styles.ts`
- React story: `packages/react/src/components/switch/switch.stories.tsx`
- React examples: `packages/react/src/components/switch/examples/`
- React styles: `.storybook/modules/switch.module.css`

## Summary
- Status: Story surface matches React.
- Highest-risk gaps: None in story inventory or demo styling.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Yes | Yes | Same root/control/thumb/label/hidden input composition. |
| Controlled | Yes | Yes | Angular uses `[(checked)]` model equivalent to React `checked`/`onCheckedChange`. |
| Disabled | Yes | Yes | Same disabled root state. |
| InitialChecked | Yes | Yes | Same `defaultChecked` initial state. |
| Context | Yes | Yes | Angular `ng-template arkSwitchContext` exposes the same checked state. |
| RootProvider | Yes | Yes | Angular `useSwitch` plus `[arkSwitchRootProvider]` matches React root provider. |
| WithField | Yes | Yes | Same Field helper/error content and switch composition. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Static template | One switch | None | No change. |
| Controlled | Component-local signal/state | Boolean checked state | User interaction | Framework-idiomatic state only. |
| Disabled | Static template | One disabled switch | None | No change. |
| InitialChecked | Static template | One initially checked switch | None | No change. |
| Context | Switch context API | Checked boolean label text | User interaction | Framework-idiomatic template context only. |
| RootProvider | `useSwitch` hook/helper | One switch API instance | Button toggles state | Framework-idiomatic provider binding only. |
| WithField | Static Field wrapper | Helper and error text | None | No change. |

## Sections / Structure
- Meta differences: Both use `title: 'Components / Switch'`.
- Decorator differences: Angular imports standalone examples through `moduleMetadata`; React re-exports examples directly.
- Per-story decorators / args / controls: No args or controls in either story surface.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkSwitch], [arkSwitchRootProvider]` | None | No change. |
| Label | `.Label` | `[arkSwitchLabel]` | None | No change. |
| Control | `.Control` | `[arkSwitchControl]` | None | No change. |
| Thumb | `.Thumb` | `[arkSwitchThumb]` | None | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | None | `switch.stories.tsx` | `switch.stories.ts` | No change. |
| Example data | None | `examples/` | `examples/` | No change. |
| Styling | None | `.storybook/modules/switch.module.css` | `switch-example-styles.ts` | No change. |

## Implementation Plan
1. Keep story exports, examples, and styles unchanged because they match React.
2. Record component-level test coverage additions in `docs/audit/switch.md`.

## Deferred (component-level work)
- None.

## Verification
- [ ] Storybook startup: Not run; story surface unchanged.
- [x] Visual check of each story: Source-level comparison confirmed all React stories have Angular equivalents with matching example structure and styles.
- [x] Story-related specs (if any): `bun run --cwd packages/angular test:ci switch/switch.spec.ts` passed, 11 tests.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
