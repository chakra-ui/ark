import { Field } from '@ark-ui/solid/field'
import { SignaturePad } from '@ark-ui/solid/signature-pad'
import { createSignal } from 'solid-js'

export const WithField = (props: Field.RootProps) => {
  const [value, setValue] = createSignal('')

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
        <SignaturePad.HiddenInput value={value()} />
      </SignaturePad.Root>
      <Field.HelperText>Additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
