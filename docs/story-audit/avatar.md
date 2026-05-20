# Avatar Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/avatar/avatar.stories.ts`
- Angular examples: `packages/angular/avatar/examples/basic.ts`, `packages/angular/avatar/examples/context.ts`, `packages/angular/avatar/examples/events.ts`, `packages/angular/avatar/examples/provider.ts`, `packages/angular/avatar/examples/root-provider.ts`
- Angular styles: `packages/angular/avatar/avatar-example-styles.ts`
- React story: `packages/react/src/components/avatar/avatar.stories.tsx`
- React examples: `packages/react/src/components/avatar/examples/basic.tsx`, `packages/react/src/components/avatar/examples/context.tsx`, `packages/react/src/components/avatar/examples/events.tsx`, `packages/react/src/components/avatar/examples/provider.tsx`, `packages/react/src/components/avatar/examples/root-provider.tsx`
- React styles: `.storybook/modules/avatar.module.css`, `.storybook/modules/button.module.css`, `.storybook/modules/utilities.css`

## Summary
- Status: Story inventory, example data, and Angular templates match the React Avatar Storybook surface. One styling parity gap was fixed for the `RootProvider` story button.
- Highest-risk gaps: None in the story surface after the focused style fix. Angular's `useAvatar` requires a `context` callback while React's hook accepts top-level props; this is framework-idiomatic and does not change the rendered story.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Re-export from `./examples/basic` | Imports `BasicExample`, renders `<avatar-basic-example />` | Same ordering and rendered surface. |
| `Context` | Re-export from `./examples/context` | Imports `ContextExample`, renders `<avatar-context-example />` | Angular uses `#avatar="arkAvatar"` instead of React render-prop context. |
| `Events` | Re-export from `./examples/events` | Imports `EventsExample`, renders `<avatar-events-example />` | Same status output and failing-large image source. |
| `Provider` | Re-export from `./examples/provider` | Imports `ProviderExample`, renders `<avatar-provider-example />` | Angular passes the `useAvatar` return through `[value]`. |
| `RootProvider` | Re-export from `./examples/root-provider` | Imports `RootProviderExample`, renders `<avatar-root-provider-example />` | Same change-avatar interaction and dynamic image URL. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded fallback text `PA`; hard-coded image URL `https://i.pravatar.cc/300?u=a` | One avatar root with fallback span and image | Browser image load controls fallback visibility | No data divergence. |
| `Context` | Hard-coded fallback branches from avatar loaded state; hard-coded image URL `https://i.pravatar.cc/300?u=a` | One avatar root, context read, fallback, image | Browser image load toggles `loaded`; no timers or random values | Angular uses exported directive state instead of React `Avatar.Context` render prop. No change. |
| `Events` | Initial local status `loading...`; image URL `https://i.pravatar.cc/3000?u=a` to demonstrate status changes | VStack with output and one avatar | `onStatusChange` / `(statusChange)` writes status from image load/error events | No data divergence. |
| `Provider` | `useAvatar` / `useAvatar({ context })` machine instance; hard-coded image URL `https://i.pravatar.cc/300?u=a` | Root provider with supplied avatar machine, fallback, image | Logs status-change details to console | Angular hook shape requires `context: () => ({ onStatusChange })`. No rendered divergence. |
| `RootProvider` | Local count starting at `0`; image URL derived as `https://i.pravatar.cc/300?u=${count}` | VStack with button and root provider avatar | Button increments count; no random values or async loaders | Angular uses `signal`/`computed`; React uses `useState`. No rendered divergence. |

## Sections / Structure
- Meta differences: None. Both stories set `title: 'Components / Avatar'` with no `parameters`, `decorators`, `argTypes`, `args`, or `tags`.
- Decorator differences: React re-exports examples directly. Angular wraps each standalone example with `moduleMetadata({ imports: [...] })`, matching neighboring Angular stories.
- Per-story decorators / args / controls: Neither stack defines per-story args or controls. Angular render templates use the example selectors.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Avatar root | `.Root` from `.storybook/modules/avatar.module.css` | `[arkAvatar]`, `[arkAvatarRootProvider]` | None; layout, sizing, radius, color, and background match. | No change. |
| Avatar image | `.Image` | `[arkAvatarImage]` | None; object fit, dimensions, and inherited radius match. | No change. |
| Avatar fallback | `.Fallback` | `[arkAvatarFallback]` | None; typography and uppercase behavior match. | No change. |
| Avatar overlay | `.Overlay` | Not used | React module exports an unused overlay class. | No change; not part of any Avatar story render. |
| `RootProvider` button | `.Root` from `.storybook/modules/button.module.css` | `.avatar-button` | Angular was missing the shared button module's SVG sizing, disabled styling, `aria-expanded` hover branch, and variant styling. | Expand `.avatar-button` to mirror the React button module for this story surface. |
| Utility layout | `.vstack` from `.storybook/modules/utilities.css` | `.vstack` from global Storybook utilities | None; both stories use the same global utility class. | No change. |
| Output | Global `output` selector from utilities | Global `output` selector from utilities | None. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Demo styling | `RootProvider` button translated only the active default button state. | `.storybook/modules/button.module.css` | `packages/angular/avatar/avatar-example-styles.ts` | Add the missing button state and variant selectors to `.avatar-button`. |
| Hook API shape | React passes `onStatusChange` directly to `useAvatar`; Angular passes it through `context`. | `packages/react/src/components/avatar/examples/provider.tsx` | `packages/angular/avatar/examples/provider.ts` | No change; Angular `useAvatar` requires `context: () => UseAvatarProps` by design. |
| Context example API shape | React uses `Avatar.Context`; Angular uses `#avatar="arkAvatar"` and `avatar.api()`. | `packages/react/src/components/avatar/examples/context.tsx` | `packages/angular/avatar/examples/context.ts` | No change; this is the Angular directive export equivalent. |

## Implementation Plan
1. Keep story exports and example templates unchanged because they already match the React story inventory and data behavior.
2. Update `packages/angular/avatar/avatar-example-styles.ts` so `.avatar-button` mirrors React's shared button styling used by the `RootProvider` example.
3. Run focused story/example verification and `git diff --check`.

## Deferred (component-level work)
- None.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook` attempted. Port `6006` was already occupied, accepted port `6007`, then Storybook failed before startup with `Error: ENOTDIR: not a directory, mkdir './node_modules/.cache/storybook/10.3.5/50ea1b9b3219aab4dbd96d1e55a32325d286165c7e9f3219c4a25b404600fa72/public/sb-addons'`. No story server was available for visual review.
- [x] Angular package typecheck: `bun run --cwd packages/angular typecheck` passed. This included `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, production package build, and `forms isolation: ok`.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci avatar/avatar.spec.ts` passed: 1 file, 13 tests.
- [x] Diff whitespace check: `git diff --check` passed.
- [x] Visual check of each story: Deferred because Storybook failed during cache setup before serving stories.

## Commit
- Hash: `0683163827dbf3639cf5d5a9df05bb10e42c56d7`
- Message: `fix(angular): align avatar story with react parity`
