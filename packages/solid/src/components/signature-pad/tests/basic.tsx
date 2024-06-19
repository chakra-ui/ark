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
