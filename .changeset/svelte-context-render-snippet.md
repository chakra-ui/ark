---
'@ark-ui/svelte': patch
---

Accept a `render` snippet on every `Context` component. 55 of the 63 take `render`; `Avatar`, `Progress`, `QrCode` and
`Timer` took `api`, and `Dialog`, `Drawer`, `Marquee` and `RadioGroup` took `children`. Those eight now take `render`
too, and keep `api` / `children` as deprecated aliases, so existing code keeps working.
