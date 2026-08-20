---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

**Toc** [New]: Add a table of contents component that tracks which headings are in view as the reader scrolls.

Pass the headings to `Toc.Root` as `items`, where each entry needs the heading element's `id` as `value` and its level
as `depth`. Set `scrollEl` when the content scrolls inside a container rather than the page, so tracking observes that
element instead of the viewport.

```tsx
<Toc.Root items={items} scrollEl={() => contentRef.current}>
  <Toc.Content />
  <Toc.Nav>
    <Toc.Title />
    <Toc.List>
      <Toc.Indicator />
      <Toc.Item item={item}>
        <Toc.Link />
      </Toc.Item>
    </Toc.List>
  </Toc.Nav>
</Toc.Root>
```

More than one heading can be active at once, so `Toc.Item` carries `data-first` and `data-last` to mark the ends of the
range, and `Toc.Indicator` spans it. Use `useToc` with `Toc.RootProvider` to reach `activeItems` and `scrollTo` from
outside the tree.

The API may still change while the component is in preview.
