# Splitter Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/splitter/splitter.stories.ts`
- Angular examples: `packages/angular/src/splitter/examples/*.ts`
- Angular styles: `packages/angular/src/splitter/splitter-example-styles.ts`
- React story: `packages/react/src/components/splitter/splitter.stories.tsx`
- React examples: `packages/react/src/components/splitter/examples/*.tsx`
- React styles: `.storybook/modules/splitter.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/utilities.css`

## Summary

- Status: Fixed story-surface styling drift; no story inventory or example behavior changes were needed.
- Highest-risk gaps: Resolved. Angular example CSS now uses the React Storybook splitter, button, and stack visual
  contracts.

## Story Inventory

| Story name         | React | Angular | Notes                                                                                                   |
| ------------------ | ----- | ------- | ------------------------------------------------------------------------------------------------------- |
| Basic              | Yes   | Yes     | Same order and panel data.                                                                              |
| Collapsible        | Yes   | Yes     | Same `defaultSize`, collapsible panel config, and labels.                                               |
| Context            | Yes   | Yes     | Same resize-to-10% action; Angular uses DI context helper.                                              |
| MultiplePanels     | Yes   | Yes     | Same three-panel data and default sizes.                                                                |
| Nested             | Yes   | Yes     | Same shared registry and nested vertical splitter.                                                      |
| ResizeIndicator    | Yes   | Yes     | Same visible structure.                                                                                 |
| RootProvider       | Yes   | Yes     | Same `useSplitter` config and current-size output.                                                      |
| Vertical           | Yes   | Yes     | Same orientation and panel data.                                                                        |
| DynamicCollapsible | Yes   | Yes     | Same responsive collapse threshold and panel config; Angular uses `ResizeObserver` to measure the root. |

## Example Data Sources

| Example            | Data origin                             | Shape                                                      | Dynamic/async                                                | Divergence                                                                 |
| ------------------ | --------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Basic              | Local panel array                       | Two panels: `a`, `b`                                       | None                                                         | No change.                                                                 |
| Collapsible        | Local panel array                       | `a` collapsible with collapsed/min/max sizes, `b` min size | None                                                         | No change.                                                                 |
| Context            | Local panel array plus splitter context | Two panels with button actions                             | Button click calls `resizePanel`                             | Angular uses `injectArkSplitterContext`, which is framework-idiomatic.     |
| MultiplePanels     | Local panel array                       | Three panels with min sizes and `[20, 60, 20]` default     | None                                                         | No change.                                                                 |
| Nested             | Local panel arrays and registry         | Outer `left/center/right`, inner `top/bottom`              | None                                                         | No change.                                                                 |
| ResizeIndicator    | Local panel array                       | Two panels with trigger indicator                          | None                                                         | No change.                                                                 |
| RootProvider       | `useSplitter` instance                  | Two panels with `[50, 50]` default                         | Output reflects `getSizes()`                                 | Angular uses computed signal label, which is framework-idiomatic.          |
| Vertical           | Local panel array                       | Two vertical panels                                        | None                                                         | No change.                                                                 |
| DynamicCollapsible | `useSplitter`, measured root width      | `a` collapsible below 600px, `b` default                   | React listens to window resize; Angular observes root resize | Angular approach preserves story behavior while fitting Angular lifecycle. |

## Sections / Structure

- Meta differences: Both stories only set `title: 'Components / Splitter'`.
- Decorator differences: React re-exports example functions; Angular wraps each standalone example with `moduleMetadata`
  imports and a render template.
- Per-story decorators / args / controls: No args or controls on either side. Angular decorators are required for
  standalone component imports.

## Styling

| Element              | React selector / class    | Angular selector / class | Gap                                                                       | Fix                                      |
| -------------------- | ------------------------- | ------------------------ | ------------------------------------------------------------------------- | ---------------------------------------- |
| Root                 | `.Root`                   | `.splitter-root`         | Angular uses hard-coded colors and adds `min-width`.                      | Align tokens and remove extra min width. |
| Panel                | `.Panel`                  | `.splitter-panel`        | Angular uses font weight 600 instead of 500.                              | Match React weight and token color.      |
| Resize trigger       | `.ResizeTrigger`          | `.splitter-trigger`      | Same structure, but hard-coded focus/drag colors.                         | Align Storybook demo tokens.             |
| Indicator            | `.ResizeTriggerIndicator` | `.splitter-indicator`    | Same structure, but hard-coded border/shadow/focus colors.                | Align Storybook demo tokens.             |
| Context button       | `button.Root`             | `.splitter-button`       | Angular lacks shared button hover, focus, disabled, sizing, and variants. | Mirror `button.module.css` surface.      |
| Root provider layout | global `.stack`           | local `.stack`           | Angular local grid overrides React global flex stack.                     | Match React utility stack.               |

## Gap Matrix

| Area   | Gap                                                                  | React reference                          | Angular location                                           | Fix                                              |
| ------ | -------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------ |
| Styles | Token and typography drift in splitter root/panel/trigger/indicator. | `.storybook/modules/splitter.module.css` | `packages/angular/src/splitter/splitter-example-styles.ts` | Update Angular CSS token names and panel weight. |
| Styles | Context action button does not match shared React button module.     | `.storybook/modules/button.module.css`   | `packages/angular/src/splitter/splitter-example-styles.ts` | Expand `.splitter-button` styles.                |
| Layout | Root provider stack uses grid and smaller gap.                       | `.storybook/modules/utilities.css`       | `packages/angular/src/splitter/splitter-example-styles.ts` | Match flex column utility.                       |

## Implementation Plan

1. Align `splitter-example-styles.ts` with React splitter, button, and stack CSS modules.
2. Run splitter spec, Angular typecheck, Storybook startup, and whitespace checks.
3. Update this audit with final verification results.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6245 --ci` reached Storybook ready at
      `http://localhost:6245/`; stopped after startup. Existing unused-entry and `DefinePlugin` warnings only.
- [ ] Visual check of each story: not performed in a browser side-by-side pass.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/splitter/splitter.spec.ts` passed, 1 file / 11
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/splitter/splitter-example-styles.ts docs/story-audit/splitter.md`
      passed after formatting this audit doc.
- [x] Whitespace: `git diff --check` passed.
- [x] Ignored audit doc whitespace: `git diff --no-index --check /dev/null docs/story-audit/splitter.md` emitted no
      whitespace warnings; exit code `1` is expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align splitter story with react parity`
