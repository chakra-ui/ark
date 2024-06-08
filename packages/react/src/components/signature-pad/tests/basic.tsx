import { SignaturePad, type SignaturePadRootProps } from '../'

export const ComponentUnderTest = (props: SignaturePadRootProps) => (
  <SignaturePad.Root {...props}>
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
  </SignaturePad.Root>
)
