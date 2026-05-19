# Menu Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/menu/*`, `packages/angular/src/menu/examples/*`, `packages/angular/src/menu/menu.stories.ts`, `packages/angular/src/menu/menu.spec.ts`
- React files: `packages/react/src/components/menu/*`, `packages/react/src/components/menu/examples/*`, `packages/react/src/components/menu/tests/menu.test.tsx`
- Storybook/style files: `.storybook/modules/menu.module.css`, `packages/angular/src/menu/menu-example-styles.ts`

## Summary
- Status: Fixed the highest-risk Angular parity gaps found in the directive API and Storybook surface.
- Highest-risk gaps: trigger values for multiple-trigger menus, item-level select callbacks, parent-derived item context for item text/state, and missing Angular stories for context menus, item context, multiple triggers, and select events.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `Menu.Trigger` accepts `value` for multiple trigger menus, but `arkMenuTrigger` ignored it. | `packages/react/src/components/menu/menu-trigger.tsx`, `examples/multiple-triggers.tsx` | `packages/angular/src/menu/menu-trigger.ts` | Added `value` signal input and passed it to `api().getTriggerProps({ value })`. |
| Public API | `Menu.ContextTrigger` can be identified by a trigger value through Zag, but Angular did not expose it. | `@zag-js/menu` `getContextTriggerProps(props)` and React context menu examples | `packages/angular/src/menu/menu-context-trigger.ts` | Added `value` signal input and passed it to `api().getContextTriggerProps({ value })`. |
| Public API | React `Menu.Item` exposes item-level `onSelect` and item context; Angular only exposed root `(select)`. | `packages/react/src/components/menu/menu-item.tsx`, `examples/select-event.tsx`, `examples/item-context.tsx` | `packages/angular/src/menu/menu-item.ts` | Added item context provider, `highlighted`/`itemId` state signals, and item-level `(select)` output listening for Zag `menu:select`. |
| Public API | React `Menu.ItemText` derives option props from its parent item; Angular required a repeated `value` input. | `packages/react/src/components/menu/menu-item-text.tsx` | `packages/angular/src/menu/menu-item-text.ts` | Made `value` optional and read parent `ARK_MENU_ITEM_CONTEXT` when present. |
| Story parity | Angular lacked stories for context menus, item context, multiple triggers, and select-event callbacks. | `examples/context.tsx`, `examples/item-context.tsx`, `examples/multiple-triggers.tsx`, `examples/select-event.tsx` | `packages/angular/src/menu/examples/*`, `menu.stories.ts` | Added focused Angular examples and story exports. |
| Story parity | Angular `RootProvider` example did not show the trigger/content shape used by React. | `packages/react/src/components/menu/examples/root-provider.tsx` | `packages/angular/src/menu/examples/root-provider.ts` | Added a trigger with indicator and aligned item values with the React example. |
| Styling parity | Angular examples lacked context-trigger and multiple-trigger/message styling. | `.storybook/modules/menu.module.css` | `packages/angular/src/menu/menu-example-styles.ts` | Added matching selectors for context trigger, trigger item affordance, and message rows. |
| Deferred story parity | React also has `ContextLazyMount`, `Links`, `MenuInDialog`, `MenuItemDialog`, `MultipleMenu`, and a more exhaustive `Nested` story. | `packages/react/src/components/menu/examples/*.tsx` | `packages/angular/src/menu/menu.stories.ts` | Deferred. `Links` needs an Angular as-child/link pattern decision, dialog stories depend on dialog parity, lazy mount depends on presence/render-strategy parity, and existing `NestedSubmenu` covers the core submenu behavior. |

## Implementation Plan
1. Add trigger value inputs for `arkMenuTrigger` and `arkMenuContextTrigger`.
2. Provide menu item context from `arkMenuItem`, expose item highlighted state, and add item-level `(select)`.
3. Allow `arkMenuItemText` to derive props from the parent item context.
4. Add Angular stories/examples for the newly covered React scenarios.
5. Add focused tests for trigger values, item-level select, item text context, and new examples.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by pre-existing unrelated `number-input/use-number-input.ts(53,9): error TS1117: An object literal cannot have multiple properties with the same name.`
- [x] Component tests: `bun run --cwd packages/angular test:ci src/menu/menu.spec.ts` passed, 35 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007 --ci` attempted; preview build failed on the same unrelated `number-input/use-number-input.ts(53,9)` TS1117 duplicate-property error.
- [ ] Manual/visual checks: Deferred with Storybook render; examples were covered by Angular component mount tests.

## Commit
- Hash: See final status for the immutable commit hash.
- Message: `fix(angular): align menu with react parity`
