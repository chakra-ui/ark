import { Field } from '@ark-ui/solid/field'
import { SignaturePad } from '@ark-ui/solid/signature-pad'
import { RotateCcwIcon } from 'lucide-solid'
import field from 'styles/field.module.css'
import styles from 'styles/signature-pad.module.css'

export const WithField = () => (
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
)
