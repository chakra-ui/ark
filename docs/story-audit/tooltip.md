# Tooltip Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/tooltip/tooltip.stories.ts`
- Angular examples: `packages/angular/src/tooltip/examples/*.ts`
- Angular styles: `packages/angular/src/tooltip/tooltip-example-styles.ts`
- React story: `packages/react/src/components/tooltip/tooltip.stories.tsx`
- React examples: `packages/react/src/components/tooltip/examples/*.tsx`
- React styles: `.storybook/modules/tooltip.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Fixed story inventory/order, removed the Angular-only story export, aligned root-provider status copy,
  controlled toggle styling, multiple-trigger icon/shortcut data, and fixed-container color.
- Highest-risk gaps: Angular exported `Interactive` with no React counterpart; the multiple-trigger toolbar used text
  glyphs and `Cmd` copy instead of React's Lucide icon surface and command-key shortcuts.

## Story Inventory

| Story name       | React        | Angular      | Notes                                                                                |
| ---------------- | ------------ | ------------ | ------------------------------------------------------------------------------------ |
| Arrow            | Yes, first   | Yes, fourth  | Reorder Angular export to match React.                                               |
| Basic            | Yes, second  | Yes, first   | Reorder Angular export to match React.                                               |
| Controlled       | Yes, third   | Yes, second  | Reorder Angular export; add missing shared button styling to the non-trigger toggle. |
| Positioning      | Yes, fourth  | Yes, sixth   | Reorder Angular export to match React.                                               |
| Context          | Yes, fifth   | Yes, seventh | Reorder Angular export to match React.                                               |
| MultipleTriggers | Yes, sixth   | Yes, eighth  | Reorder Angular export and align icon/shortcut data.                                 |
| RootProvider     | Yes, seventh | Yes, ninth   | Reorder Angular export and align status text.                                        |
| Delay            | Yes, eighth  | Yes, third   | Reorder Angular export to match React.                                               |
| WithinFixed      | Yes, ninth   | Yes, tenth   | Reorder Angular export to match React.                                               |
| Interactive      | No           | Yes          | Remove Angular-only story export.                                                    |

## Example Data Sources

| Example          | Data origin                                   | Shape                                           | Dynamic/async                            | Divergence                                                                                   |
| ---------------- | --------------------------------------------- | ----------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Arrow            | Static example markup                         | Single trigger, content, arrow, arrow tip       | None                                     | No data divergence.                                                                          |
| Basic            | Static example markup                         | Single trigger and content                      | None                                     | No data divergence.                                                                          |
| Controlled       | Local component state                         | Boolean open state                              | Toggle button mutates local state        | Angular toggle button lacked React button module styling.                                    |
| Positioning      | Inline positioning config                     | `placement: left-start`, offset object          | None                                     | No data divergence.                                                                          |
| Context          | Tooltip API context                           | Reads open boolean                              | Tooltip state changes by interaction     | Angular interpolates the root API directly; equivalent surface.                              |
| MultipleTriggers | Local `tools` array                           | Four tool records: id, label, shortcut, icon    | Tooltip trigger value drives active tool | Angular used text letters and `Cmd` copy; React uses Lucide-style icons and command symbols. |
| RootProvider     | `useTooltip` return                           | Tooltip API object                              | Tooltip state changes by interaction     | Angular displayed `open`/`closed`; React displays boolean strings.                           |
| Delay            | Static props                                  | `openDelay: 0`, `closeDelay: 0`                 | None                                     | No data divergence.                                                                          |
| WithinFixed      | Inline positioning config and container style | Fixed container plus fixed positioning strategy | None                                     | Angular used Tailwind red `#ef4444`; React uses CSS `red`.                                   |
| Interactive      | Static example markup                         | Interactive tooltip content link                | None                                     | React has no exported story counterpart.                                                     |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Tooltip'`; neither sets args, argTypes, parameters, tags, or
  decorators at the meta level.
- Decorator differences: Angular uses per-story `moduleMetadata` imports and render templates; React re-exports example
  functions directly.
- Per-story decorators / args / controls: No story-specific args or controls in either stack. Angular story order and
  `Interactive` export needed alignment.

## Styling

| Element           | React selector / class           | Angular selector / class                  | Gap                                                             | Fix                                             |
| ----------------- | -------------------------------- | ----------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| Trigger           | `.Trigger`                       | `[arkTooltipTrigger]`                     | Visual styles are equivalent.                                   | No change.                                      |
| Controlled toggle | `button.Root`                    | Plain `button`                            | Toggle was unstyled.                                            | Add `.Button` class and shared button styling.  |
| Content           | `.Content`                       | `[arkTooltipContent]`                     | React puts popover z-index on content; Angular used positioner. | Move z-index to content.                        |
| Arrow tip         | `.ArrowTip`                      | `[arkTooltipArrowTip]`                    | Equivalent border surface.                                      | No change.                                      |
| Toolbar           | `.Toolbar`                       | `.Toolbar`                                | Equivalent container surface.                                   | No change.                                      |
| Toolbar button    | `.ToolbarButton` with Lucide SVG | `.ToolbarButton` with text letters        | Icon surface differed.                                          | Render Lucide-style inline SVG icons.           |
| Shortcut          | `.Shortcut`                      | `.Shortcut`                               | Angular used `Cmd`; React uses command symbols.                 | Use escaped command/shift symbols in tool data. |
| Fixed container   | Inline style `background: red`   | `.FixedContainer { background: #ef4444 }` | Color differed.                                                 | Change to `red`.                                |

## Gap Matrix

| Area                  | Gap                                                      | React reference                                                                                                         | Angular location                                      | Fix                                                                        |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------- |
| Story inventory       | Angular exports `Interactive` without React counterpart. | `tooltip.stories.tsx` exports nine stories.                                                                             | `tooltip.stories.ts`, `examples/interactive.ts`       | Remove `Interactive` export/import and delete unused Angular-only example. |
| Story order           | Angular order differs from React.                        | React export order: Arrow, Basic, Controlled, Positioning, Context, MultipleTriggers, RootProvider, Delay, WithinFixed. | `tooltip.stories.ts`                                  | Reorder imports/exports.                                                   |
| Controlled styling    | Toggle button did not use React shared button surface.   | `controlled.tsx` imports `styles/button.module.css`.                                                                    | `examples/controlled.ts`, `tooltip-example-styles.ts` | Add `.Button` class and matching CSS.                                      |
| RootProvider copy     | Angular displayed `open`/`closed`.                       | `root-provider.tsx` renders `String(tooltip.open)`.                                                                     | `examples/root-provider.ts`                           | Render the boolean value directly.                                         |
| MultipleTriggers data | Angular used text glyphs and `Cmd` labels.               | `multiple-triggers.tsx` uses Lucide icons and command symbols.                                                          | `examples/multiple-triggers.ts`                       | Render inline SVG icons and use escaped command/shift symbols.             |
| Fixed container       | Angular background differed.                             | `within-fixed.tsx` uses `background: 'red'`.                                                                            | `tooltip-example-styles.ts`                           | Use `background: red`.                                                     |

## Implementation Plan

1. Reorder Angular story imports/exports to match React and remove the Angular-only `Interactive` story.
2. Delete the now-unused `examples/interactive.ts` file.
3. Align controlled, root-provider, multiple-trigger, and fixed-container story surfaces.
4. Update tooltip example styles for the shared button surface and content z-index.
5. Run focused tooltip tests, typecheck, Storybook startup, formatting/whitespace checks, and record results.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6252 --ci` reached Storybook ready at
      `http://localhost:6252/`; stopped after startup. Existing unused TS compilation and `DefinePlugin` warnings only.
- [x] Storybook smoke: `curl -I --max-time 3 http://localhost:6252/`,
      `curl -I --max-time 3 'http://localhost:6252/iframe.html?id=components-tooltip--basic&viewMode=story'`, and
      `curl -I --max-time 3 'http://localhost:6252/iframe.html?id=components-tooltip--multiple-triggers&viewMode=story'`
      all returned `HTTP/1.1 200 OK`.
- [ ] Visual check of each story: not performed in browser side-by-side; structure/data/style parity was reviewed from
      source and Storybook iframe smoke checks passed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/tooltip/tooltip.spec.ts` passed, 1 file / 25
      tests.
- [x] Angular typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/tooltip/tooltip.stories.ts     packages/angular/src/tooltip/examples/controlled.ts packages/angular/src/tooltip/examples/multiple-triggers.ts     packages/angular/src/tooltip/examples/root-provider.ts packages/angular/src/tooltip/tooltip-example-styles.ts     docs/story-audit/tooltip.md`
      passed.
- [x] Whitespace: `git diff --check` passed; ignored audit-doc whitespace check against `/dev/null` produced no
      warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align tooltip story with react parity`
