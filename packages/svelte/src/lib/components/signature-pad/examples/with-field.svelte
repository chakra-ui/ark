<script>
  import { Field } from '@ark-ui/svelte/field'
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'

  let value = $state('')
</script>

<Field.Root>
  <SignaturePad.Root onDrawEnd={(details) => details.getDataUrl('image/png').then((url) => (value = url))}>
    <SignaturePad.Label>Label</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
    <SignaturePad.HiddenInput {value} />
  </SignaturePad.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
