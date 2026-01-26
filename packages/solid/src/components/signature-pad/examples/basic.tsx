import { SignaturePad } from '@ark-ui/solid/signature-pad'
import { RotateCcwIcon } from 'lucide-solid'
import styles from 'styles/signature-pad.module.css'

export const Basic = () => (
  <SignaturePad.Root class={styles.Root}>
    <SignaturePad.Label class={styles.Label}>Sign below</SignaturePad.Label>
    <SignaturePad.Control class={styles.Control}>
      <SignaturePad.Segment class={styles.Segment} />
      <SignaturePad.ClearTrigger class={styles.ClearTrigger}>
        <RotateCcwIcon />
      </SignaturePad.ClearTrigger>
      <SignaturePad.Guide class={styles.Guide} />
    </SignaturePad.Control>
  </SignaturePad.Root>
)
