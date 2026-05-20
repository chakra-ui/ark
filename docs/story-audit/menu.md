# Menu Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/menu/menu.stories.ts`
- Angular examples: `packages/angular/src/menu/examples/`
- Angular styles: `packages/angular/src/menu/menu-example-styles.ts`
- React story: `packages/react/src/components/menu/menu.stories.tsx`
- React examples: `packages/react/src/components/menu/examples/`
- React styles: `.storybook/modules/menu.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/dialog.module.css`

## Summary

- Status: Planned fixes for Storybook surface parity.
- Highest-risk gaps: Angular exports three extra stories, nested submenu structure is shorter than React, radio item
  data is missing one item, `SelectEvent` renders Angular-only status text, and shared menu/dialog/button demo styling
  is less complete than React.

## Story Inventory

| Story name          | React | Angular | Notes                                                                                   |
| ------------------- | ----- | ------- | --------------------------------------------------------------------------------------- |
| Basic               | Yes   | Yes     | Angular missing arrow element before fixes.                                             |
| CheckboxItems       | Yes   | Yes     | Data and state match.                                                                   |
| Context             | Yes   | Yes     | Matches rendered items.                                                                 |
| ContextLazyMount    | Yes   | Yes     | Angular uses explicit `ark-presence` for lazy mount; framework-specific but equivalent. |
| Controlled          | Yes   | Yes     | Data and controlled state match; external button needed React button styling.           |
| Group               | Yes   | Yes     | Item groups match.                                                                      |
| Links               | Yes   | Yes     | Link targets and labels match.                                                          |
| MenuInDialog        | Yes   | Yes     | Structure matches; dialog/button/close icon styling needed alignment.                   |
| MenuItemDialog      | Yes   | Yes     | Structure matches; dialog action styling and close icon needed alignment.               |
| MultipleMenu        | Yes   | Yes     | Data arrays match.                                                                      |
| MultipleTriggers    | Yes   | Yes     | Message data and actions match.                                                         |
| Nested              | Yes   | Yes     | Angular had fewer repeated nested Share menus before fixes.                             |
| RadioItems          | Yes   | Yes     | Angular missing `type` option before fixes.                                             |
| ItemContext         | Yes   | Yes     | Framework-specific item context expression is equivalent.                               |
| RootProvider        | Yes   | Yes     | Data and action match; existing `openLabel` test helper retained.                       |
| SelectEvent         | Yes   | Yes     | Angular rendered extra selected status and did not log root select before fixes.        |
| WithSeparator       | No    | Yes     | Angular-only story export removed from public story list.                               |
| ControlledHighlight | No    | Yes     | Angular-only story export removed from public story list.                               |
| NestedSubmenu       | No    | Yes     | Angular-only story export removed from public story list.                               |

## Example Data Sources

| Example          | Data origin                | Shape                                                              | Dynamic/async                          | Divergence                                                                |
| ---------------- | -------------------------- | ------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------- |
| Basic            | Inline menu items          | 4 `{ value, label }` items in markup                               | None                                   | Angular missing React arrow before fixes.                                 |
| CheckboxItems    | Component state            | Two booleans: toolbar true, status bar false                       | Controlled state only                  | No change.                                                                |
| Context          | Inline menu items          | Cut/copy/paste/separator/delete                                    | Context trigger                        | No change.                                                                |
| ContextLazyMount | Inline menu items          | Parent cut/copy/paste/share; child email/message/airdrop           | Lazy mount/unmount                     | Angular uses presence wrapper to model React `lazyMount`/`unmountOnExit`. |
| Controlled       | Component state            | `open` boolean, four action items                                  | Controlled open state                  | No data change.                                                           |
| Group            | Inline grouped items       | Clipboard group with 3, Selection group with 2                     | None                                   | No change.                                                                |
| Links            | Inline anchors             | Docs, GitHub, Changelog links                                      | None                                   | No change.                                                                |
| MenuInDialog     | Inline dialog/menu content | Dialog with theme menu of 3 items                                  | Lazy mounted menu inside dialog        | Styling/icon parity needed.                                               |
| MenuItemDialog   | Component state            | Menu actions plus alert dialog                                     | Controlled dialog open state           | Styling/icon parity needed.                                               |
| MultipleMenu     | Local arrays               | File items length 3; edit items length 4                           | Optional select hook                   | No change.                                                                |
| MultipleTriggers | Local array                | 3 messages, 5 actions                                              | Shared trigger positioning             | No change.                                                                |
| Nested           | Inline nested menu items   | Parent items, export child length 3, three share children length 7 | Nested portals                         | Angular had two child menus instead of React's four before fixes.         |
| RadioItems       | Component state            | Sort value plus options                                            | Controlled value state                 | Angular missing `type` option before fixes.                               |
| ItemContext      | Inline items               | 4 settings items with separator                                    | Highlight context controls font weight | No change.                                                                |
| RootProvider     | `useMenu` hook             | Four edit items plus external highlight action                     | Controlled through root provider API   | Story data matches; existing `openLabel` test helper retained.            |
| SelectEvent      | Local array                | 4 account items                                                    | Select event logging                   | Angular rendered extra status before fixes.                               |

## Sections / Structure

- Meta differences: both stories use `title: 'Components / Menu'`; no args, argTypes, tags, parameters, or top-level
  decorators.
- Decorator differences: React re-exports example components directly. Angular uses `moduleMetadata` per story to import
  each standalone example.
- Per-story decorators / args / controls: no story args or controls on either side. Angular story order is being changed
  to match React exactly.

## Styling

| Element             | React selector / class                   | Angular selector / class                      | Gap                                                                        | Fix                                                                            |
| ------------------- | ---------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Menu trigger        | `.Trigger`                               | `[arkMenuTrigger]`                            | Angular used solid coral button styling.                                   | Align transparent bordered trigger, hover/open, focus, disabled, icon sizing.  |
| Menu content        | `.Content`                               | `[arkMenuContent]`                            | Angular used different background, radius, min width, no border/animation. | Align popover background, border, radius, shadow, sizing, z-index, animations. |
| Menu item           | `.Item`                                  | `[arkMenuItem]`                               | Angular used smaller text/padding and coral highlighted state.             | Align dimensions, neutral highlight, disabled state.                           |
| Trigger item        | `.TriggerItem`                           | `[arkMenuTriggerItem]`                        | Angular used smaller spacing.                                              | Align spacing, highlighted state, and chevron marker.                          |
| Checkbox/radio item | `.CheckboxItem`, `.RadioItem`            | `[arkMenuCheckboxItem]`, `[arkMenuRadioItem]` | Angular used smaller spacing and highlight color.                          | Align item sizing, checked color, disabled state.                              |
| Item group label    | `.ItemGroupLabel`                        | `[arkMenuItemGroupLabel]`                     | Angular label spacing and tracking differed.                               | Align React values.                                                            |
| Dialog examples     | `dialog.module.css`, `button.module.css` | Ark dialog selectors and local classes        | Angular examples lacked comparable dialog and button styling.              | Add local dialog/body/actions/button/close styling.                            |
| Message action      | `.MessageAction`                         | `.message-action[arkMenuTrigger]`             | Angular lacked border radius and svg sizing.                               | Align message trigger styling.                                                 |

## Gap Matrix

| Area            | Gap                                               | React reference                                                | Angular location                      | Fix                                                                                         |
| --------------- | ------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- |
| Story inventory | Extra Angular public stories.                     | `menu.stories.tsx` exports 16 stories.                         | `menu.stories.ts` exports 19 stories. | Remove `WithSeparator`, `ControlledHighlight`, `NestedSubmenu` exports/imports and reorder. |
| Basic           | Missing arrow.                                    | `examples/basic.tsx` uses `Menu.Arrow` and `Menu.ArrowTip`.    | `examples/basic.ts`                   | Add `ArkMenuArrow` and `ArkMenuArrowTip`.                                                   |
| RadioItems      | Missing `Type` option.                            | `examples/radio-items.tsx` has `name`, `date`, `size`, `type`. | `examples/radio-items.ts`             | Add `type` radio item.                                                                      |
| Nested          | Missing repeated share submenus.                  | `examples/nested.tsx` has Share, Export, Share, Share.         | `examples/nested.ts`                  | Add the two additional Share child menus.                                                   |
| SelectEvent     | Extra selected paragraph and root state mutation. | `examples/select-event.tsx` logs root and item selects.        | `examples/select-event.ts`            | Remove status render/state and log root select.                                             |
| Styling         | Menu, button, dialog visual states diverge.       | CSS modules listed above.                                      | `menu-example-styles.ts`              | Translate CSS module surface to Angular selectors/classes.                                  |

## Implementation Plan

1. Reorder Angular stories to match React and remove Angular-only public story exports.
2. Add the missing Basic arrow, RadioItems option, and Nested submenu repetitions.
3. Align SelectEvent behavior/copy to React by removing extra visible status and logging root selections.
4. Update menu example styles to mirror React menu, button, dialog, and message action styling.
5. Run focused formatting, tests, typecheck, Storybook startup, and whitespace checks.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6234 --ci` reached Storybook ready at
      `http://localhost:6234/`; stopped after startup. Existing warnings included unused TS compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed in this run.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/menu/menu.spec.ts` passed, 1 file / 42 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting / whitespace: `bun prettier --write ...menu files... docs/story-audit/menu.md` completed;
      `git diff --check` passed; `git diff --no-index --check /dev/null docs/story-audit/menu.md` emitted no whitespace
      warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align menu story with react parity`
