# Menu Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/menu/*`, `packages/angular/src/menu/examples/*`, `packages/angular/src/menu/menu.stories.ts`, `packages/angular/src/menu/menu.spec.ts`, `packages/angular/src/menu/menu-example-styles.ts`
- React files: `packages/react/src/components/menu/*`, `packages/react/src/components/menu/examples/*`, `packages/react/src/components/menu/tests/menu.test.tsx`
- Storybook/style files: `.storybook/modules/menu.module.css`, `packages/angular/src/menu/menu-example-styles.ts`

## Summary
- Status: Re-audited after previous parity pass (commit 79cbe9802). All deferred Storybook gaps have now been closed by adding Angular stories/examples for `ContextLazyMount`, `Group`, `Links`, `MenuInDialog`, `MenuItemDialog`, `MultipleMenu`, and `Nested`. Public directive API parity (trigger values, item-level `(select)`, parent-derived item text/state) was already covered by the previous pass.
- Highest-risk gaps closed in this pass: Storybook story parity for the seven deferred React stories; Angular `Links` example confirms the directive-on-anchor (`<a arkMenuItem href="...">`) idiom that replaces React's `asChild`. Lazy-mount parity is composed through `<ark-presence lazyMount unmountOnExit>` instead of root-level `lazyMount`/`unmountOnExit` props (matches the existing Angular Dialog/Presence pattern recorded in `docs/technical-requirements.md`).
- Highest-risk gaps deferred: none. Lazy-mount remains a composition rather than a Root input, which is intentional given the directive-centric, DI-based architecture in `docs/technical-requirements.md` (no React-style `MenuRootBaseProps extends UsePresenceProps` join needed).

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | React `Links` story renders `Menu.Item asChild` wrapping an anchor; Angular had no example. | `packages/react/src/components/menu/examples/links.tsx` | `packages/angular/src/menu/examples/links.ts`, `menu.stories.ts` | Added Angular example applying `arkMenuItem` directly to `<a href>`; no `asChild` polyfill required because Angular menu parts are directives. |
| Story parity | React `Group` story used `Menu.ItemGroup`/`Menu.ItemGroupLabel`; Angular only exposed it as `ItemGroup`. | `packages/react/src/components/menu/examples/group.tsx` | `packages/angular/src/menu/examples/group.ts`, `menu.stories.ts` | Added `MenuGroupExample` and a `Group` story alongside the existing `ItemGroup` story so the framework switcher resolves consistently. |
| Story parity | React `Nested` story exercises multiple sibling `Menu.TriggerItem` submenus inside a portal; Angular only had a single-submenu `NestedSubmenu`. | `packages/react/src/components/menu/examples/nested.tsx` | `packages/angular/src/menu/examples/nested.ts`, `menu.stories.ts` | Added `MenuNestedExample` mirroring the React `Nested` example (Share + Export sibling submenus) while keeping the focused `NestedSubmenu`. |
| Story parity | React `MultipleMenu` shows a reusable parametrised `<Menu />` component. | `packages/react/src/components/menu/examples/multiple-menu.tsx` | `packages/angular/src/menu/examples/multiple-menu.ts`, `menu.stories.ts` | Added `MenuMultipleMenuItem` standalone component plus a `MenuMultipleMenuExample` host that renders two independent menus with distinct ids. |
| Story parity | React `ContextLazyMount` uses `lazyMount unmountOnExit` on `Menu.Root`. | `packages/react/src/components/menu/examples/context-lazy-mount.tsx` | `packages/angular/src/menu/examples/context-lazy-mount.ts`, `menu.stories.ts` | Composed the same behaviour with `<ark-presence [present]="root.api().open" lazyMount unmountOnExit>` wrapping the portal/positioner tree, matching the Angular Dialog/Presence pattern. |
| Story parity | React `MenuInDialog` mounts a menu inside a Dialog. | `packages/react/src/components/menu/examples/menu-in-dialog.tsx` | `packages/angular/src/menu/examples/menu-in-dialog.ts`, `menu.stories.ts` | Added Angular example using `ArkDialogRoot` plus the menu directives, with `<ark-presence>` lazy-mount around the menu portal contents. |
| Story parity | React `MenuItemDialog` opens a Dialog from a menu item. | `packages/react/src/components/menu/examples/menu-item-dialog.tsx` | `packages/angular/src/menu/examples/menu-item-dialog.ts`, `menu.stories.ts` | Added Angular example using a signal-controlled `[(open)]` on `arkDialog`, opening from a menu item `(click)`. |
| Public API (prior pass) | `arkMenuTrigger` ignored `value` for multiple-trigger menus. | `packages/react/src/components/menu/menu-trigger.tsx` | `packages/angular/src/menu/menu-trigger.ts` | Already closed in commit 79cbe9802 — `value` input forwarded to `getTriggerProps({ value })`. |
| Public API (prior pass) | `arkMenuContextTrigger` lacked a `value` input. | `@zag-js/menu` `getContextTriggerProps` | `packages/angular/src/menu/menu-context-trigger.ts` | Already closed in commit 79cbe9802. |
| Public API (prior pass) | Item-level `onSelect`/item context. | `packages/react/src/components/menu/menu-item.tsx`, `menu-item-context.tsx` | `packages/angular/src/menu/menu-item.ts`, `use-menu-item-context.ts` | Already closed in commit 79cbe9802 — item context provider, `highlighted`/`itemId` signals, item-level `(select)`. |
| Public API (prior pass) | `arkMenuItemText` required a duplicate `value`. | `packages/react/src/components/menu/menu-item-text.tsx` | `packages/angular/src/menu/menu-item-text.ts` | Already closed in commit 79cbe9802 — reads parent `ARK_MENU_ITEM_CONTEXT` when present. |
| Styling parity | Story-specific selectors for context trigger, trigger item, and multiple-trigger message rows. | `.storybook/modules/menu.module.css` | `packages/angular/src/menu/menu-example-styles.ts` | Already covered in commit 79cbe9802; no further changes needed for the new stories beyond the existing selectors and inline styles. |
| Public API (no change) | React `Menu.Root` accepts `lazyMount`/`unmountOnExit` via `UsePresenceProps`. | `packages/react/src/components/menu/menu-root.tsx` | `packages/angular/src/menu/menu-root.ts` | No change. `docs/technical-requirements.md` keeps composition with `<ark-presence>` rather than baking presence flags into every Root; same pattern is already used by Dialog, Combobox, Popover, etc. Examples document the wrapper idiom. |

## Implementation Plan
1. Add Angular `Links` example using `arkMenuItem` on `<a href>` and a `Links` story.
2. Add `Group`, `Nested`, `MultipleMenu`, `ContextLazyMount`, `MenuInDialog`, and `MenuItemDialog` example components and matching stories.
3. Extend `menu.spec.ts` with mount/anchor sanity checks for the new examples.
4. Re-run menu specs and a scoped `tsc -p tsconfig.json --noEmit` to confirm no regressions.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/menu/menu.spec.ts` → 42 tests passing.
- [x] Typecheck (library): `bunx tsc -p packages/angular/tsconfig.json --noEmit` → exit 0 (no menu errors).
- [x] Typecheck (specs): `bunx tsc -p packages/angular/tsconfig.spec.json --noEmit` → only pre-existing unrelated `navigation-menu/navigation-menu.spec.ts(124,73)` TS4111 (index-signature access) error remains. Not touched by this audit.
- [ ] Full build/typecheck: `bun run --cwd packages/angular typecheck` blocked by the same unrelated `navigation-menu` spec error above.
- [ ] Storybook render: not executed in this pass (the previous pass attempt was blocked by an unrelated `number-input` TS1117 issue; that error has since been resolved, but a Storybook smoke test is left for the dedicated visual check pass).
- [ ] Manual/visual checks: deferred. The added examples are exercised by Angular component mount tests covering directive wiring, but pixel-level Storybook comparison against the React reference is not part of this re-audit pass.

## Commit
- Hash: `bf27092e3`
- Message: `fix(angular): align menu with react parity`
