<script lang="ts">
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'
  import RotateCcwIcon from 'lucide-svelte/icons/rotate-ccw'
  import styles from 'styles/signature-pad.module.css'
</script>

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
