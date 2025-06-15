<script>
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'
</script>

<SignaturePad.Root>
  <SignaturePad.Label>Sign below</SignaturePad.Label>
  <SignaturePad.Control>
    <SignaturePad.Segment />
    <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
    <SignaturePad.Guide />
  </SignaturePad.Control>
</SignaturePad.Root>
