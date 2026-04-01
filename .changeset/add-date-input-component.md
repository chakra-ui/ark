---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add new `DateInput` component for typing dates with keyboard input.

```jsx
<DateInput.Root>
  <DateInput.Label>Date</DateInput.Label>
  <DateInput.Control>
    <DateInput.SegmentGroup>
      {segments.map((segment) => (
        <DateInput.Segment segment={segment} />
      ))}
    </DateInput.SegmentGroup>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.Root>
```
