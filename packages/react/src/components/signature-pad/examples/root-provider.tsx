import { SignaturePad, useSignaturePad } from '@ark-ui/react/signature-pad'

export const RootProvider = () => {
  const signaturePad = useSignaturePad()

  return (
    <>
      <button onClick={() => signaturePad.clear()}>Clear</button>

      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Control>
          <SignaturePad.Segment />
          <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
          <SignaturePad.Guide />
        </SignaturePad.Control>
      </SignaturePad.RootProvider>
    </>
  )
}
