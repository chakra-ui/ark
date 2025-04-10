import { Field, useField } from '@ark-ui/react/field'
import { useState } from 'react'

export const RootProvider = () => {
  const [invalid, setInvalid] = useState(false)
  const value = useField({
    invalid,
  })

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
