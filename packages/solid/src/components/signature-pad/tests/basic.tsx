import { Field } from '../../field'
import { SignaturePad } from '../'

export const ComponentUnderTest = (props: SignaturePad.RootProps) => (
  <SignaturePad.Root {...props}>
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
  </SignaturePad.Root>
)

export const SignaturePadWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <SignaturePad.Root>
      <SignaturePad.Label>Label</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
      <SignaturePad.HiddenInput value="" />
    </SignaturePad.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
