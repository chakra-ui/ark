<script>
  import { SignaturePad, useSignaturePad } from '@ark-ui/svelte/signature-pad'

  const id = $props.id()
  const signaturePad = useSignaturePad({ id })
</script>

<SignaturePad.RootProvider value={signaturePad}>
  <SignaturePad.Label>Sign below</SignaturePad.Label>
  <SignaturePad.Control>
    <SignaturePad.Segment />
    <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
    <SignaturePad.Guide />
  </SignaturePad.Control>
</SignaturePad.RootProvider>
