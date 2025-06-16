<script>
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'
</script>

<SignaturePad.Root>
  <SignaturePad.Label>Sign below</SignaturePad.Label>
  <SignaturePad.Control>
    <SignaturePad.Segment />
    <SignaturePad.Guide />
  </SignaturePad.Control>

  <SignaturePad.Context>
    {#snippet render(api)}
      <div>
        <p>Is drawing: {api().drawing}</p>
        <p>Is empty: {api().empty}</p>
        <SignaturePad.ClearTrigger disabled={api().empty}>Clear Signature</SignaturePad.ClearTrigger>
      </div>
    {/snippet}
  </SignaturePad.Context>
</SignaturePad.Root>
