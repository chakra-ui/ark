import { Field } from '@ark-ui/react/field'
import { SignaturePad } from '@ark-ui/react/signature-pad'
import { useState } from 'react'

export const WithField = (props: Field.RootProps) => {
  const [value, setValue] = useState('')

  return (
    <Field.Root {...props}>
      <SignaturePad.Root
        onDrawEnd={(details) => details.getDataUrl('image/png').then((url) => setValue(url))}
      >
        <SignaturePad.Label>Label</SignaturePad.Label>
        <SignaturePad.Control>
          <SignaturePad.Segment />
          <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
          <SignaturePad.Guide />
        </SignaturePad.Control>
        <SignaturePad.HiddenInput value={value} />
      </SignaturePad.Root>
      <Field.HelperText>Additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
