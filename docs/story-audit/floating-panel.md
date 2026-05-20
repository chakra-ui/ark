# Floating Panel Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/floating-panel/floating-panel.stories.ts`
- Angular examples: `packages/angular/src/floating-panel/examples/`
- Angular styles: `packages/angular/src/floating-panel/floating-panel-example-styles.ts`
- React story: `packages/react/src/components/floating-panel/floating-panel.stories.tsx`
- React examples: `packages/react/src/components/floating-panel/examples/`
- React styles: `.storybook/modules/floating-panel.module.css`

## Summary

- Status: Fixed; Angular story inventory, order, example content, and shared panel icon surface now match the React
  story surface.
- Highest-risk gaps: None remaining for story parity.

## Story Inventory

| Story name         | React        | Angular      | Notes                                                          |
| ------------------ | ------------ | ------------ | -------------------------------------------------------------- |
| AnchorPosition     | Yes, first   | Yes, sixth   | Reorder Angular first.                                         |
| Basic              | Yes, second  | Yes, first   | Reorder Angular second.                                        |
| ControlledOpen     | Yes, third   | Yes, third   | Keep story; align body content.                                |
| ControlledPosition | Yes, fourth  | Yes, fourth  | Keep story; align body content.                                |
| ControlledSize     | Yes, fifth   | Yes, fifth   | Keep story; align body content.                                |
| LazyMount          | Yes, sixth   | Yes, fifth   | Reorder Angular sixth.                                         |
| Context            | Yes, seventh | Yes, seventh | Keep story; align context copy casing.                         |
| RootProvider       | No           | Yes          | Remove Angular story export from the public Storybook surface. |

## Example Data Sources

| Example            | Data origin                              | Shape                                                                | Dynamic/async                                                 | Divergence                                                                                                              |
| ------------------ | ---------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| AnchorPosition     | Inline `getAnchorPosition` callback      | Returns `{ x, y }` from trigger center or `{ 0, 0 }` fallback        | No dynamic data beyond trigger rect                           | Angular body says "Anchored to the trigger center."; React body says "Some content".                                    |
| Basic              | Static panel markup                      | Shared trigger, panel controls, body paragraph, eight resize handles | None                                                          | Angular shared panel uses text glyphs for controls; React uses icon components.                                         |
| ControlledOpen     | Local state                              | Boolean `open`, initially `false`                                    | User-driven open changes                                      | Angular displays `Open: ...`; React displays only `Some content`.                                                       |
| ControlledPosition | Local state                              | Point `{ x: 200, y: 200 }`                                           | User-driven drag changes                                      | Angular displays position; React displays only `Some content`.                                                          |
| ControlledSize     | Local state                              | Size `{ width: 400, height: 300 }`                                   | User-driven resize changes                                    | Angular displays size; React displays only `Some content`.                                                              |
| LazyMount          | Root lazy mounting / presence            | No custom data                                                       | Mount/unmount is user-driven; exit completion hook is present | Angular uses `ArkPresenceComponent` because root-level lazy mount inputs are not exposed directly in the story surface. |
| Context            | Root context projection                  | Reads `open` from context                                            | User-driven open changes                                      | Angular copy starts "Floating panel"; React starts "floatingPanel".                                                     |
| RootProvider       | Angular-only `useFloatingPanel` provider | `UseFloatingPanelReturn` with computed open label                    | User-driven open changes                                      | No React story export; remove from Storybook inventory.                                                                 |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Floating Panel'`. Neither declares parameters, decorators,
  argTypes, args, or tags at meta level.
- Decorator differences: React re-exports example functions directly. Angular uses per-story `moduleMetadata` decorators
  to import standalone examples.
- Per-story decorators / args / controls: Neither stack provides story args or controls. Angular currently has one extra
  `RootProvider` story decorator/import and a different export order.

## Styling

| Element         | React selector / class | Angular selector / class                                           | Gap                                                                    | Fix                                                        |
| --------------- | ---------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------- |
| Trigger         | `.Trigger`             | `[arkFloatingPanelTrigger]`                                        | Visual styling already matches plus Angular adds focus-visible styles. | No change; Angular focus-visible affordance is acceptable. |
| Positioner      | `.Positioner`          | `[arkFloatingPanelPositioner]`                                     | Matches.                                                               | No change.                                                 |
| Content         | `.Content`             | `[arkFloatingPanelContent]`                                        | Matches.                                                               | No change.                                                 |
| Header          | `.Header`              | `[arkFloatingPanelHeader]`                                         | Matches.                                                               | No change.                                                 |
| Title icon      | `.Title svg`           | `[arkFloatingPanelTitle] [aria-hidden='true']`                     | Angular uses text `::` instead of a grip icon.                         | Add Angular icon component and style its host.             |
| Control buttons | `.ControlButton svg`   | `[arkFloatingPanelStageTrigger]`, `[arkFloatingPanelCloseTrigger]` | Button chrome matches; icons use text glyphs instead of React icons.   | Add Angular icon components and style their hosts.         |
| Body            | `.Body`                | `[arkFloatingPanelBody]`                                           | Matches.                                                               | No change.                                                 |
| Resize triggers | `.ResizeTrigger`       | `[arkFloatingPanelResizeTrigger]`                                  | Matches.                                                               | No change.                                                 |

## Gap Matrix

| Area              | Gap                                                                            | React reference                       | Angular location                                                                                    | Fix                                                                 |
| ----------------- | ------------------------------------------------------------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Story order       | Angular starts with `Basic`; React starts with `AnchorPosition`.               | `floating-panel.stories.tsx` exports  | `floating-panel.stories.ts`                                                                         | Reorder Angular exports to match React.                             |
| Story inventory   | Angular exports `RootProvider`; React has no story export.                     | React story exports seven stories     | Angular `RootProvider` story                                                                        | Remove Angular `RootProvider` export/import from Storybook surface. |
| Example body copy | Angular controlled/anchor examples show state-specific text.                   | React examples render `Some content`. | `examples/anchor-position.ts`, `controlled-open.ts`, `controlled-position.ts`, `controlled-size.ts` | Use `Some content` in panel body.                                   |
| Context copy      | Angular renders `Floating panel is ...`; React renders `floatingPanel is ...`. | `examples/context.tsx`                | `examples/context.ts`                                                                               | Match React copy.                                                   |
| Icons             | Angular uses text glyphs.                                                      | React imports lucide icons            | `examples/panel.ts`                                                                                 | Add local SVG icon components and use them in the shared panel.     |

## Implementation Plan

1. Reorder Angular story exports to `AnchorPosition`, `Basic`, `ControlledOpen`, `ControlledPosition`, `ControlledSize`,
   `LazyMount`, `Context`. Done.
2. Remove the Angular-only `RootProvider` story export/import from the Storybook public surface. Done.
3. Add local Angular SVG icons for the floating panel shared demo controls and update `FloatingPanelDemoPanel`. Done.
4. Align anchor/controlled body content and context copy with React. Done.
5. Update the Angular example styles so the new icon hosts match React icon sizing and color. Done.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6222 --ci` reached Storybook ready at
      `http://localhost:6222/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Not performed in browser side-by-side; startup/type/spec verification completed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/floating-panel/floating-panel.spec.ts` passed, 1
      file / 12 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting: `bun prettier --write ...floating-panel files... docs/story-audit/floating-panel.md` completed; files
      were already formatted except the audit doc.
- [x] Diff check: `git diff --check` passed. Scoped `git diff --check -- ...floating-panel tracked files...` passed.
      No-index whitespace checks for new `examples/icons.ts` and ignored `docs/story-audit/floating-panel.md` produced
      no whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align floating-panel story with react parity`
