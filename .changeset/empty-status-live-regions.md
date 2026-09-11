---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Announce empty, loading and error states to screen readers.

**`Combobox.Empty` and `Listbox.Empty` are breaking changes.** They used to render `role="presentation"` inside the
`List`, and unmount entirely when the collection was not empty. Both defeated the purpose:

- A `role="listbox"` may only own `option` and `group` elements, so the message was pruned from the accessibility tree.
  The listbox reported as empty and the text existed for sighted users only.
- A live region only announces a change to a region already in the accessibility tree, so mounting the element at the
  same moment its text appears announces nothing.

`Empty` now stays mounted and swaps only its children, renders as a sibling of `List` rather than inside it, and carries
`role="status"` with `aria-live="polite"` and `aria-atomic="true"`. Move it out of `List` and put the styled message in
a child element — the part itself collapses to zero height while there is nothing to say:

```diff
  <Combobox.Content>
-   <Combobox.List>
-     <Combobox.Empty className={styles.Item}>No results found</Combobox.Empty>
+   <Combobox.Empty>
+     <div className={styles.Empty}>No results found</div>
+   </Combobox.Empty>
+   <Combobox.List>
      {/* items */}
    </Combobox.List>
  </Combobox.Content>
```

**Adds a `Status` part** to `Combobox`, `Listbox` and `Select`: an always-mounted polite live region whose content the
consumer drives. `Empty` keys off `collection.size === 0`, which is also true while an async list is loading, so it
cannot distinguish "loading" from "genuinely empty" and cannot carry an error message. `Status` covers those.

Zag announces the highlighted option and nothing else, so neither state reached a screen reader before this.
