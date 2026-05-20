# Swap Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/swap/swap.stories.ts`
- Angular examples: `packages/angular/src/swap/examples/fade.ts`, `flip.ts`, `rotate.ts`, `scale.ts`, `icons.ts`
- Angular styles: `packages/angular/src/swap/swap-example-styles.ts`
- React story: `packages/react/src/components/swap/swap.stories.tsx`
- React examples: `packages/react/src/components/swap/examples/fade.tsx`, `flip.tsx`, `rotate.tsx`, `scale.tsx`
- React styles: `.storybook/modules/swap.module.css`

## Summary

- Status: Aligned after updating the Angular flip demo icons to match React's Lucide outline icon surface.
- Highest-risk gaps: None. The remaining Angular-only `aria-label` / `aria-pressed` attributes are intentional
  accessibility metadata for icon-only native buttons and do not change the visual Storybook surface.

## Story Inventory

| Story name | React | Angular | Notes                                                                                                  |
| ---------- | ----- | ------- | ------------------------------------------------------------------------------------------------------ |
| Fade       | Yes   | Yes     | Same order and icon pair: check / x.                                                                   |
| Flip       | Yes   | Yes     | Same order, perspective, play / pause icons; Angular icon paths updated to outline Lucide-style paths. |
| Rotate     | Yes   | Yes     | Same order and icon pair: sun / moon.                                                                  |
| Scale      | Yes   | Yes     | Same order and icon pair: volume / volume-x.                                                           |

## Example Data Sources

| Example | Data origin                                                           | Shape                                               | Dynamic/async                     | Divergence                                                                |
| ------- | --------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| Fade    | Local boolean state: React `useState(false)`, Angular `signal(false)` | One `Swap.Root` / `ark-swap` with on/off indicators | Click toggles state synchronously | No visual divergence; Angular adds button accessibility attributes.       |
| Flip    | Local boolean state and inline perspective style                      | One `Swap.Root` / `ark-swap` with on/off indicators | Click toggles state synchronously | Fixed Angular play/pause SVGs to match React's outline Lucide icon style. |
| Rotate  | Local boolean state                                                   | One `Swap.Root` / `ark-swap` with on/off indicators | Click toggles state synchronously | No visual divergence; Angular adds button accessibility attributes.       |
| Scale   | Local boolean state                                                   | One `Swap.Root` / `ark-swap` with on/off indicators | Click toggles state synchronously | No visual divergence; Angular adds button accessibility attributes.       |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Swap'`; neither defines `parameters`, `decorators`,
  `argTypes`, `args`, or `tags` on meta.
- Decorator differences: React re-exports example functions directly. Angular uses per-story `moduleMetadata` imports
  for standalone examples and renders their selectors.
- Per-story decorators / args / controls: Angular has no args or controls on the four story objects, matching React's
  export-only stories.

## Styling

| Element          | React selector / class                              | Angular selector / class                       | Gap                                                         | Fix                              |
| ---------------- | --------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| Button           | `.Button` in `swap.module.css`                      | `.Button` in `swap-example-styles.ts`          | None                                                        | No change.                       |
| Icon sizing      | `.Button svg`                                       | `.Button svg` plus Angular icon host sizing    | None                                                        | No change.                       |
| Focus ring       | `.Button:focus-visible`                             | `.Button:focus-visible`                        | None                                                        | No change.                       |
| Fade indicator   | `.FadeIndicator[data-state='open'/'closed']`        | `.FadeIndicator[data-state='open'/'closed']`   | None                                                        | No change.                       |
| Flip indicator   | `.FlipIndicator[data-state='open'/'closed']`        | `.FlipIndicator[data-state='open'/'closed']`   | Filled play/pause icons differed from Lucide outline style. | Updated Angular play/pause SVGs. |
| Rotate indicator | `.RotateIndicator[data-state='open'/'closed']`      | `.RotateIndicator[data-state='open'/'closed']` | None                                                        | No change.                       |
| Scale indicator  | `.ScaleIndicator[data-state='open'/'closed']`       | `.ScaleIndicator[data-state='open'/'closed']`  | None                                                        | No change.                       |
| Keyframes        | `fade`, `rotate`, `scale`, `flip`, `blur` keyframes | Same keyframes                                 | None                                                        | No change.                       |

## Gap Matrix

| Area                   | Gap                                                                          | React reference                                                                                                | Angular location                              | Fix                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| Flip icon visual style | Angular used filled play/pause glyphs while React uses Lucide outline icons. | `packages/react/src/components/swap/examples/flip.tsx` imports `PlayIcon` and `PauseIcon` from `lucide-react`. | `packages/angular/src/swap/examples/icons.ts` | Replaced flip demo SVGs with outline Lucide-style play and pause shapes. |

## Implementation Plan

1. Confirm Angular and React story inventories, ordering, meta, and render strategies.
2. Compare each example's state, indicator structure, icon pair, and inline styles.
3. Compare `swap.module.css` against `swap-example-styles.ts`.
4. Patch the flip demo icons to match the React visual surface.
5. Run focused swap verification, Storybook startup, typecheck, and `git diff --check`.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6247 --ci` reached Storybook ready at
      `http://localhost:6247/`; stopped the port-bound process afterward.
- [ ] Visual check of each story: Not performed in browser side-by-side; structural/style parity was checked from
      source.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/swap/swap.spec.ts` passed, 1 file / 10 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting: `bun prettier --check packages/angular/src/swap/examples/icons.ts docs/story-audit/swap.md` passed
      after formatting.
- [x] Whitespace: `git diff --check -- packages/angular/src/swap/examples/icons.ts` passed;
      `git diff --no-index --check /dev/null docs/story-audit/swap.md` emitted no whitespace warnings, with exit code
      `1` expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align swap story with react parity`
