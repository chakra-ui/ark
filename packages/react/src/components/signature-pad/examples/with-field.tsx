import { Field } from '@ark-ui/react/field'
import { SignaturePad } from '@ark-ui/react/signature-pad'
import { RotateCcwIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/signature-pad.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <SignaturePad.Root className={styles.Root}>
      <SignaturePad.Label className={styles.Label}>Label</SignaturePad.Label>
      <SignaturePad.Control className={styles.Control}>
        <SignaturePad.Segment className={styles.Segment} />
        <SignaturePad.ClearTrigger className={styles.ClearTrigger}>
          <RotateCcwIcon />
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide className={styles.Guide} />
      </SignaturePad.Control>
    </SignaturePad.Root>
    <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)
