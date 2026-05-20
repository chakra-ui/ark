# Dialog Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/dialog/dialog.stories.ts`
- Angular examples: `packages/angular/src/dialog/examples/`
- Angular styles: `packages/angular/src/dialog/dialog-example-styles.ts`
- React story: `packages/react/src/components/dialog/dialog.stories.tsx`
- React examples: `packages/react/src/components/dialog/examples/`
- React styles: `.storybook/modules/dialog.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/field.module.css`, `.storybook/modules/menu.module.css`

## Summary

- Status: Fixed; verification completed except Storybook startup, which was blocked by an unrelated Angular/Babel cache
  `ENOENT` during global Storybook compilation.
- Highest-risk gaps: Angular exported `DefaultOpen` and `RapidStateChange` even though the React story surface does not;
  Angular `NonModal` omitted the backdrop rendered by React; the scroll examples used shortened content data; Angular
  demo styling only partially matched React button, field, dialog close-trigger, content width, and menu styling.

## Story Inventory

| Story name       | React             | Angular           | Notes                                                                                                      |
| ---------------- | ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| AlertDialog      | Yes, first export | Yes, first export | Reordered Angular to match React.                                                                          |
| Basic            | Yes               | Yes               | Matches story presence.                                                                                    |
| Confirmation     | Yes               | Yes               | Matches story presence.                                                                                    |
| Context          | Yes               | Yes               | Angular uses local template interpolation instead of React render prop; no surface change needed.          |
| Controlled       | Yes               | Yes               | Matches story presence.                                                                                    |
| FinalFocus       | Yes               | Yes               | Matches story presence.                                                                                    |
| InitialFocus     | Yes               | Yes               | Matches story presence.                                                                                    |
| InsideScroll     | Yes               | Yes               | Data aligned to React.                                                                                     |
| LazyMount        | Yes               | Yes               | Angular uses `ArkPresenceComponent` to demonstrate `lazyMount` / `unmountOnExit`; no component API change. |
| MultipleTriggers | Yes               | Yes               | Matches story presence and data shape.                                                                     |
| Nested           | Yes               | Yes               | Matches story presence.                                                                                    |
| NonModal         | Yes               | Yes               | Added React-equivalent backdrop.                                                                           |
| OpenFromMenu     | Yes               | Yes               | Added translated menu selectors to match React CSS module surface.                                         |
| OutsideScroll    | Yes               | Yes               | Data aligned to React's 12 sections.                                                                       |
| RootProvider     | Yes, last export  | Yes, last export  | Reorder Angular to match React.                                                                            |
| DefaultOpen      | No                | No                | Removed from public Angular story exports.                                                                 |
| RapidStateChange | No                | No                | Removed from public Angular story exports.                                                                 |

## Example Data Sources

| Example          | Data origin                        | Shape                                             | Dynamic/async                                | Divergence                                                                      |
| ---------------- | ---------------------------------- | ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------- |
| AlertDialog      | Inline copy                        | Static dialog content                             | None                                         | Fixed destructive button variant marker.                                        |
| Basic            | Inline copy                        | Static dialog content                             | None                                         | No change.                                                                      |
| Confirmation     | Local component state              | Textarea string plus two dialog machine instances | Controlled open state and close interception | Angular signal/useDialog version is framework-idiomatic and surface-equivalent. |
| Context          | Dialog context                     | Open boolean rendered in description              | Depends on dialog state                      | Angular uses exported root API instead of render prop; no visible divergence.   |
| Controlled       | Local component state              | Boolean open state                                | Controlled open/onOpenChange                 | Angular `model()` binding is framework-idiomatic and surface-equivalent.        |
| FinalFocus       | Local element ref                  | One final focus button                            | Focus restore behavior                       | No change.                                                                      |
| InitialFocus     | Local element ref                  | Two inputs                                        | Initial focus behavior                       | No change.                                                                      |
| InsideScroll     | Local constant array               | Seven `{ title, body }` sections in React         | None                                         | Angular uses tuple rows with React-equivalent copy.                             |
| LazyMount        | Root options / presence            | Static dialog content                             | Mount/unmount tied to open state             | Angular uses `ArkPresenceComponent`; no surface change.                         |
| MultipleTriggers | Local users array                  | Three users with `id`, `name`, `email`            | Trigger value selects active user            | No data change.                                                                 |
| Nested           | Two dialog machine instances       | Parent and child dialog content                   | Programmatic opening                         | No visible divergence.                                                          |
| NonModal         | Inline copy                        | Static dialog content                             | Non-modal root option                        | Backdrop markup aligned.                                                        |
| OpenFromMenu     | Menu item markup plus dialog state | Three menu items and one separator                | Menu item click controls dialog open         | Menu styling aligned.                                                           |
| OutsideScroll    | Local constant array               | Twelve sections in React                          | Initial focus on content                     | Angular uses twelve tuple rows with React-equivalent copy.                      |
| RootProvider     | Dialog machine instance            | External button plus dialog content               | Programmatic opening                         | No visible divergence.                                                          |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Dialog'`; neither sets args, argTypes, tags, parameters, or
  decorators at meta level.
- Decorator differences: React re-exports example components directly. Angular wraps each story with
  `moduleMetadata({ imports: [...] })` and renders the standalone example selector.
- Per-story decorators / args / controls: Angular story objects have no args or controls. Fix the Angular export order
  and removed Angular-only public stories so the public Storybook list matches React.

## Styling

| Element                           | React selector / class                                                          | Angular selector / class                                                                            | Gap                                                                               | Fix                                                            |
| --------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Dialog trigger and action buttons | `button.Root`                                                                   | `[arkDialogTrigger]`, `button`, `.button`                                                           | Angular button dimensions, hover, disabled, focus, and variants are incomplete.   | Expand button selectors to match shared React button styles.   |
| Dialog content                    | `dialog.Content`                                                                | `[arkDialogContent]`                                                                                | Angular `max-width: 24rem` does not preserve React viewport gutter.               | Use `max-width: calc(100vw - 2rem)`.                           |
| Dialog close trigger              | `dialog.CloseTrigger`                                                           | `[arkDialogCloseTrigger]`                                                                           | Angular size/color/cursor differs from React.                                     | Match React 1.75rem close button and neutral emphasized color. |
| Field inputs/textareas            | `field.Root`, `field.Input`, `field.Textarea`                                   | `.field`, inputs, textarea                                                                          | Angular lacks emphasized border, focus, placeholder, and textarea minimum height. | Align field selectors with React field module surface.         |
| Menu trigger/content/items        | `menu.Trigger`, `menu.Content`, `menu.Item`, `menu.Separator`, `menu.Indicator` | `[arkMenuTrigger]`, `[arkMenuContent]`, `[arkMenuItem]`, `[arkMenuSeparator]`, `[arkMenuIndicator]` | Angular `OpenFromMenu` has no translated menu CSS.                                | Add focused menu styling to dialog example styles.             |
| Non-modal backdrop                | `dialog.Backdrop`                                                               | Missing                                                                                             | Angular visual surface does not render React backdrop.                            | Add `arkDialogBackdrop` to `NonModal`.                         |
| Scroll sections                   | `dialog.ScrollSection`                                                          | `.scroll-section`                                                                                   | Styling mostly equivalent; data text is shortened.                                | Keep styling and align section data.                           |

## Gap Matrix

| Area            | Gap                                                                                               | React reference                                           | Angular location                                | Fix                                                             |
| --------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| Story inventory | `DefaultOpen` and `RapidStateChange` are Angular-only exports.                                    | `packages/react/src/components/dialog/dialog.stories.tsx` | `packages/angular/src/dialog/dialog.stories.ts` | Remove public exports and reorder remaining stories.            |
| AlertDialog     | Destructive action lacks solid styling marker.                                                    | `examples/alert-dialog.tsx`                               | `examples/alert-dialog.ts`                      | Add `data-variant="solid"`.                                     |
| NonModal        | Missing backdrop.                                                                                 | `examples/non-modal.tsx`                                  | `examples/non-modal.ts`                         | Import/render `ArkDialogBackdrop`.                              |
| InsideScroll    | Terms copy shortened.                                                                             | `examples/inside-scroll.tsx`                              | `examples/inside-scroll.ts`                     | Replace data with React-equivalent full body text.              |
| OutsideScroll   | Privacy copy shortened and missing sections 11-12.                                                | `examples/outside-scroll.tsx`                             | `examples/outside-scroll.ts`                    | Replace data with React-equivalent 12 sections.                 |
| Styling         | Button, field, close trigger, content width, and menu selectors do not fully match React modules. | `.storybook/modules/*.module.css`                         | `dialog-example-styles.ts`                      | Translate the relevant CSS module rules into Angular selectors. |

## Implementation Plan

1. Update the Angular story imports and exports to match the React story order and inventory.
2. Apply example-level parity fixes in `AlertDialog`, `NonModal`, `InsideScroll`, and `OutsideScroll`.
3. Expand `dialog-example-styles.ts` with React-equivalent button, field, close-trigger, content width, scrollbar, and
   menu styling.
4. Run Dialog-focused test, typecheck, Storybook startup, and whitespace checks; record exact results here.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/dialog/dialog.spec.ts` passed, 1 file / 34 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --write packages/angular/src/dialog/dialog.stories.ts packages/angular/src/dialog/dialog-example-styles.ts packages/angular/src/dialog/examples/alert-dialog.ts packages/angular/src/dialog/examples/non-modal.ts packages/angular/src/dialog/examples/inside-scroll.ts packages/angular/src/dialog/examples/outside-scroll.ts docs/story-audit/dialog.md`
      completed.
- [x] Whitespace: full `git diff --check` passed. Dialog-scoped `git diff --check -- ...dialog files...` passed. Ignored
      audit-doc whitespace check with `git diff --no-index --check /dev/null docs/story-audit/dialog.md` produced no
      whitespace-error output.
- [ ] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6014 --ci` failed before serving with
      unrelated Angular/Babel cache `ENOENT` errors under `packages/angular/.angular/cache/21.2.11/babel-webpack` while
      compiling `@zag-js/live-region` from `tags-input` and `@zag-js/scroll-area` modules.
- [ ] Visual check of each story: Not performed because Storybook did not reach a served ready state.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align dialog story with react parity`
