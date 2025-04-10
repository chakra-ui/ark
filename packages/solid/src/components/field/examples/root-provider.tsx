import { Field, useField } from '@ark-ui/solid/field'
import { createMemo, createSignal } from 'solid-js'

export const RootProvider = () => {
  const [invalid, setInvalid] = createSignal(false)
  const fieldProps = createMemo(() => ({
    invalid: invalid(),
  }))
  const value = useField(fieldProps)

  return (
    <>
      <button onClick={() => setInvalid((prev) => !prev)}>Toggle Invalid</button>
      <Field.RootProvider value={value}>
        <Field.Label>Label</Field.Label>
        <Field.Input />
        <Field.HelperText>Some additional Info</Field.HelperText>
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.RootProvider>
    </>
  )
}
