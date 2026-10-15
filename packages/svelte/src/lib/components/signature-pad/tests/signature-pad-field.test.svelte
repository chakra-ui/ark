<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <SignaturePad.Root>
    <SignaturePad.Control>
      <SignaturePad.Segment />
    </SignaturePad.Control>
  </SignaturePad.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
