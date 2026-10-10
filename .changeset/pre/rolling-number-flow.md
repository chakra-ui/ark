---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add the `NumberFlow` component, which animates a number by rolling each digit to its new value.

```tsx
<NumberFlow.Root value={price} formatOptions={{ style: 'currency', currency: 'USD' }}>
  <NumberFlow.Segments />
  <NumberFlow.HiddenValueText />
</NumberFlow.Root>
```

Formatting goes through `Intl.NumberFormat`, including currency, percent, compact notation, and non-Latin numeral
systems. Digits can roll along their shortest path, in the direction of the change (`trend`), or through every value in
between (`continuous`), with configurable `spinTiming`, `transformTiming`, and `stagger`. The number snaps instead of
rolling when the user prefers reduced motion, and `live` announces the settled value to screen readers.

Use `Segments` for the default rendering, or compose `Digit`, `DigitTrack`, `DigitCell`, and `Symbol` to style
individual digits and symbols.
