# Forms

## Field

`Field` labels, describes and validates one control. It runs on `@zag-js/field`.

```tsx
import { Field } from '@ark-ui/react/field'

export const Email = () => (
  <Field.Root required validationMode="onBlur">
    <Field.Label>
      Email
      <Field.Indicator type="required">*</Field.Indicator>
    </Field.Label>
    <Field.Input type="email" />
    <Field.HelperText>We'll never share it.</Field.HelperText>
    <Field.ErrorText match="valueMissing">Email is required</Field.ErrorText>
    <Field.ErrorText match="typeMismatch">Enter a valid email</Field.ErrorText>
  </Field.Root>
)
```

- **Native controls:** `Field.Input`, `Field.Textarea` and `Field.Select`. They all carry `[data-field-control]`.
- **Ark controls inherit the field.** A `Select`, `Checkbox`, `NumberInput` or any form component inside `Field.Root`
  picks up `disabled`, `invalid`, `required`, `readOnly` and the helper and error text links. Use the component's own
  label part (`Select.Label`), not `Field.Label`. Don't wire `aria-describedby` by hand.
- **Validation of native controls:** constraints (`required`, `type="email"`, `pattern`) validate on their own.
  `validationMode` is `onSubmit`, `onBlur` or `onChange`. `validate={({ value }) => message | messages | undefined}`
  adds your own rules and may return a promise. Put `noValidate` on the form so your error text shows instead of the
  browser's bubble.
- **Validation of Ark controls:** `validationMode`, `validate` and `match` only run on native controls. For a `Select`,
  `Combobox` or other Ark component, check the value yourself and pass `errors` (or `invalid`) to `Field.Root`. Read
  messages from `field.errors` through `Field.Context`.

```tsx
export const FrameworkField = () => {
  const [value, setValue] = useState<string[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setErrors(value.length ? [] : ['Choose a framework'])
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <Field.Root required errors={errors}>
        <Select.Root collection={collection} value={value} onValueChange={(details) => setValue(details.value)}>
          <Select.Label>Framework</Select.Label>
          {/* control, positioner, content, list */}
          <Select.HiddenSelect />
        </Select.Root>
        <Field.ErrorText>Choose a framework</Field.ErrorText>
      </Field.Root>
    </form>
  )
}
```

- **Errors:** `Field.ErrorText` stays mounted with `hidden` while the field is valid. Don't render it conditionally, and
  style its visible state with `:not([hidden])`. `match` shows it for one native failure only.
- **Required marker:** `Field.Indicator type="required"` shows only when the field is required. There is no
  `Field.RequiredIndicator` in v6.
- **Several controls in one field,** like a currency select next to an amount input: wrap each in
  `Field.Item value="…"`, and set `target` on `Field.Root` to the item the label points at.

## Fieldset

`Fieldset` groups related controls under one legend, with shared `disabled` and `invalid` state:

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Frameworks</Fieldset.Legend>
  <Checkbox.Group name="framework">…</Checkbox.Group>
  <Fieldset.HelperText>Pick any</Fieldset.HelperText>
  <Fieldset.ErrorText>Pick at least one</Fieldset.ErrorText>
</Fieldset.Root>
```

## Native form submission and reset

Form-bound components submit through a hidden native input. Give the root a `name` and render the hidden part:
`Checkbox.HiddenInput`, `Switch.HiddenInput`, `Slider.HiddenInput`, `Select.HiddenSelect`, and so on. The hidden input
is also how a form's `reset` restores the default value. The component page shows which hidden part it uses.

## Form libraries

React Hook Form, TanStack Form and Formisch each have a section in `{docs}/docs/{framework}/guides/forms.md`. Native
controls register directly. For Ark components, control them with `value` and `onValueChange` from the library's
controller, and keep the hidden part for `name`.
