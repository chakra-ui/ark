---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

Move to zag `2.0.0-next.2` and drop the shims it makes unnecessary.

`normalizeHotkey` and the `Platform` re-export are back in `@zag-js/hotkeys`, and `@zag-js/presence` now calls
`onEnterComplete`, so Ark's local stand-ins for all three are gone.

**Svelte:** the `useX` hooks now require an `id`. `useMachine` began taking `InputProps<T>` rather than
`Partial<T["props"]>`, which surfaced that Svelte never passed one — two hook instances on a page rendered the same
element ids (`undefined:trigger` for both). Svelte can only mint an id inside a component (`$props.id()` is not
callable from `.svelte.ts`, and a module counter is not SSR-safe), so the hook has to be given one:

```diff
- const collapsible = useCollapsible()
+ const id = $props.id()
+ const collapsible = useCollapsible({ id })
```

Components are unaffected — `<Collapsible.Root>` and friends still generate their own id, and `id` stays optional on
them. Note that `$props.id()` may only be called once per component; derive from it if you need two.
