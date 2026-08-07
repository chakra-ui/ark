---
"@ark-ui/vue": patch
---

- Fixed `asChild` duplicating the child element's `class`, so `<ark.div class="parent" as-child><span class="child">`
  rendered `class="child parent child"` instead of `class="parent child"`.
- Fixed `asChild` applying props to a leading comment node, which silently dropped them when a comment or a false `v-if`
  preceded the child element.
