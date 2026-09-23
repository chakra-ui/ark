---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add the `Accordion.ItemHeader` part, which zag has had since `itemHeader` joined its anatomy but Ark never wired up.

It renders an `h3` and wraps the trigger, which is what the ARIA accordion pattern asks for — without it the triggers
are bare buttons and screen reader users cannot navigate between sections by heading. Its `render` receives the item
state (`expanded`, `disabled`, `focused`).

```diff
  <Accordion.Item value={item.value}>
-   <Accordion.ItemTrigger>
-     {item.title}
-   </Accordion.ItemTrigger>
+   <Accordion.ItemHeader>
+     <Accordion.ItemTrigger>
+       {item.title}
+     </Accordion.ItemTrigger>
+   </Accordion.ItemHeader>
    <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
  </Accordion.Item>
```

An `h3` carries browser default margin and font-size, so reset them on the part when adopting it.
