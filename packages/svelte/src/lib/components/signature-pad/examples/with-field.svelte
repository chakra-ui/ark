<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'
  import RotateCcwIcon from 'lucide-svelte/icons/rotate-ccw'
  import field from 'styles/field.module.css'
  import styles from 'styles/signature-pad.module.css'
</script>

<Field.Root class={field.Root}>
  <SignaturePad.Root class={styles.Root}>
    <SignaturePad.Label class={styles.Label}>Label</SignaturePad.Label>
    <SignaturePad.Control class={styles.Control}>
      <SignaturePad.Segment class={styles.Segment} />
      <SignaturePad.ClearTrigger class={styles.ClearTrigger}>
        <RotateCcwIcon />
      </SignaturePad.ClearTrigger>
      <SignaturePad.Guide class={styles.Guide} />
    </SignaturePad.Control>
  </SignaturePad.Root>
  <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Error Info</Field.ErrorText>
</Field.Root>
