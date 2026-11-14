---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add the `Meter` component, which displays a numeric value within a known range, such as disk usage or battery level.

```tsx
<Meter.Root defaultValue={24}>
  <Meter.Label>Storage used</Meter.Label>
  <Meter.ValueText />
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

`low`, `high`, and `optimum` grade the value the way the HTML `<meter>` element does, exposed as `data-state`
(`optimal`, `suboptimal`, or `least-optimal`) for styling. The value is formatted with `Intl.NumberFormat` and announced
through `aria-valuetext`.
