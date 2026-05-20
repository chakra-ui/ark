# Presence Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/presence/presence.stories.ts`
- Angular examples:
  `packages/angular/src/presence/examples/{basic,lazy-mount,lazy-mount-and-unmount-on-exit,skip-animation-on-mount,unmount-on-exit}.ts`
- Angular styles: `packages/angular/src/presence/presence-example-styles.ts`
- React story: `packages/react/src/components/presence/presence.stories.tsx`
- React examples:
  `packages/react/src/components/presence/examples/{basic,lazy-mount,lazy-mount-and-unmount-on-exit,skip-animation-on-mount,unmount-on-exit}.tsx`
- React styles: `.storybook/modules/presence.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/utilities.css`

## Summary

- Status: Focused fixes applied. Angular now matches React story inventory and ordering, and its local button styling
  covers the same shared-button states used by the React examples.
- Highest-risk gaps: None in the Presence story surface.

## Story Inventory

| Story name                  | React       | Angular     | Notes                                                                       |
| --------------------------- | ----------- | ----------- | --------------------------------------------------------------------------- |
| `Basic`                     | Yes, first  | Yes, first  | Both render a closed Presence with `Content` and a Toggle button.           |
| `LazyMount`                 | Yes, second | Yes, second | Both pass `lazyMount` and render `Lazy Mounted`.                            |
| `LazyMountAndUnmountOnExit` | Yes, third  | Yes, third  | Angular was previously ordered after `UnmountOnExit`; fixed to match React. |
| `SkipAnimationOnMount`      | Yes, fourth | Yes, fourth | Both start present and pass `skipAnimationOnMount`.                         |
| `UnmountOnExit`             | Yes, fifth  | Yes, fifth  | Angular was previously third; fixed to match React.                         |

## Example Data Sources

| Example                     | Data origin         | Shape                                                                     | Dynamic/async                  | Divergence                                                                      |
| --------------------------- | ------------------- | ------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `Basic`                     | Local boolean state | `present = false`, Toggle button, Presence content `Content`              | User toggles boolean; no async | No divergence. Angular uses `signal(false)` instead of React `useState(false)`. |
| `LazyMount`                 | Local boolean state | `present = false`, `lazyMount`, content `Lazy Mounted`                    | User toggles boolean; no async | No divergence.                                                                  |
| `LazyMountAndUnmountOnExit` | Local boolean state | `present = false`, `lazyMount`, `unmountOnExit`, content `Lazy + Unmount` | User toggles boolean; no async | No divergence.                                                                  |
| `SkipAnimationOnMount`      | Local boolean state | `present = true`, `skipAnimationOnMount`, content `No Initial Animation`  | User toggles boolean; no async | No divergence.                                                                  |
| `UnmountOnExit`             | Local boolean state | `present = false`, `unmountOnExit`, content `Unmount on Exit`             | User toggles boolean; no async | No divergence.                                                                  |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Presence'` and no custom args, argTypes, tags, parameters, or
  global decorators.
- Decorator differences: React re-exports example functions directly. Angular uses `moduleMetadata` per story to import
  each standalone example component, matching local Angular Storybook conventions.
- Per-story decorators / args / controls: No story-specific args or controls exist in either stack. Angular story export
  order was aligned to React.

## Styling

| Element          | React selector / class                                      | Angular selector / class                         | Gap                                                                                                                  | Fix                                                                |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Example wrapper  | `className="stack"` from `.storybook/modules/utilities.css` | `.root` in `presence-example-styles.ts`          | Angular wrapper is local but preserves stack layout with an added max-width to constrain the 100%-wide Presence box. | No change; framework-local wrapper preserves intended demo layout. |
| Toggle button    | `button.Root` from `.storybook/modules/button.module.css`   | `.ToggleButton`                                  | Angular lacked shared-button `gap`, disabled filtering, and hover disabled guard.                                    | Added the missing button-state styling surface.                    |
| Presence box     | `styles.Box` from `.storybook/modules/presence.module.css`  | `:host ::ng-deep [data-scope='presence']`        | Selectors differ because Angular styles target emitted Ark DOM instead of CSS modules. Visual properties match.      | No change.                                                         |
| Open animation   | `.Box[data-state='open']` with `fade-in`                    | `[data-state='open']` with `presence-fade-in`    | Keyframe names differ only to avoid collisions; timing and transform match.                                          | No change.                                                         |
| Closed animation | `.Box[data-state='closed']` with `fade-out`                 | `[data-state='closed']` with `presence-fade-out` | Keyframe names differ only to avoid collisions; timing and transform match.                                          | No change.                                                         |

## Gap Matrix

| Area                 | Gap                                                                                     | React reference                                               | Angular location                                           | Fix                                                    |
| -------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| Story order          | `UnmountOnExit` appeared before `LazyMountAndUnmountOnExit` and `SkipAnimationOnMount`. | `packages/react/src/components/presence/presence.stories.tsx` | `packages/angular/src/presence/presence.stories.ts`        | Reordered Angular exports to match React.              |
| Button state styling | Local Angular button style did not include every shared-button state from React.        | `.storybook/modules/button.module.css`                        | `packages/angular/src/presence/presence-example-styles.ts` | Added `gap`, disabled opacity/filter, and hover guard. |

## Implementation Plan

1. Reorder Angular `Presence` story exports to match the React story file.
2. Bring the local `.ToggleButton` selector closer to React's shared `button.Root` state surface.
3. Run focused Presence verification and whitespace checks.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6241 --ci` reached Storybook ready at
      `http://localhost:6241/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/presence/presence.spec.ts` passed, 1 file / 16
      tests.
- [x] Angular typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/presence/presence.stories.ts     packages/angular/src/presence/presence-example-styles.ts docs/story-audit/presence.md`
      passed after formatting this audit file with `bun prettier --write docs/story-audit/presence.md`.
- [x] Whitespace check:
      `git diff --check -- packages/angular/src/presence/presence.stories.ts packages/angular/src/presence/presence-example-styles.ts`
      passed. `git diff --no-index --check /dev/null docs/story-audit/presence.md` produced no whitespace warnings; exit
      code `1` is expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align presence story with react parity`
