<script>
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'

  let imageUrl = $state('')
</script>

<SignaturePad.Root onDrawEnd={(details) => details.getDataUrl('image/png').then((url) => (imageUrl = url))}>
  <SignaturePad.Label>Sign below</SignaturePad.Label>
  <SignaturePad.Control>
    <SignaturePad.Segment fill="orange" />
    <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
    <SignaturePad.Guide />
  </SignaturePad.Control>
</SignaturePad.Root>

{#if imageUrl}
  <img src={imageUrl} alt="Signature" />
{/if}
