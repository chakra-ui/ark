---
'@ark-ui/react': major
'@ark-ui/solid': major
'@ark-ui/svelte': major
'@ark-ui/vue': major
---

- **Field** and **Fieldset**: Built on the `@zag-js/field` and `@zag-js/fieldset` machines. Fields now validate natively
  and with `validate`, show results by `validationMode`, accept server `errors`, and track `touched`, `dirty` and
  `filled`. `Field.ErrorText` takes `match` to show only for one native failure.
- **Field**: Replaced `Field.RequiredIndicator` with `Field.Indicator`, whose `type` is `required`, `invalid`, `valid`
  or `validating`. Use `<Field.Indicator type="required">*</Field.Indicator>`.
- **Field**: Renamed the `input`, `textarea`, `select` and `requiredIndicator` parts to `control` and `indicator`
  (`data-field-control`, `data-field-indicator`), and changed generated ids to `{id}:label` and `{id}:control`. Error
  text stays mounted and hidden while the field is valid, and `Field.Root` no longer sets `role="group"`.
