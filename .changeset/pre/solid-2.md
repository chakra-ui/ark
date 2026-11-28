---
'@ark-ui/solid': major
---

Require Solid 2. `@ark-ui/solid` now peers on `solid-js` and `@solidjs/web` `>=2.0.0-rc.19`, and no longer works with
Solid 1.

```sh
npm install solid-js@next @solidjs/web@next
```

Set `"jsxImportSource": "@solidjs/web"` in your `tsconfig.json`.
