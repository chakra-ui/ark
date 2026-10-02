---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/vue': patch
'@ark-ui/svelte': patch
---

- **Field**: Fix `Field.ErrorText` not being announced by VoiceOver and Narrator. It is now linked via `aria-describedby`
  instead of `aria-errormessage`, since screen reader support for `aria-errormessage` is still incomplete.

  ```diff
  - expect(input).toHaveAccessibleErrorMessage('Error Info')
  + expect(input).toHaveAccessibleDescription(expect.stringContaining('Error Info'))
  ```
