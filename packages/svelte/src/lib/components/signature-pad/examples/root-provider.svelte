<script lang="ts">
  import { SignaturePad, useSignaturePad } from '@ark-ui/svelte/signature-pad'
  import RotateCcwIcon from 'lucide-svelte/icons/rotate-ccw'
  import styles from 'styles/signature-pad.module.css'

  const id = $props.id()
  const signaturePad = useSignaturePad({ id })
</script>

<div class="stack">
  <output>no of paths: {signaturePad().paths.length}</output>
  <SignaturePad.RootProvider class={styles.Root} value={signaturePad}>
    <SignaturePad.Label class={styles.Label}>Sign below</SignaturePad.Label>
    <SignaturePad.Control class={styles.Control}>
      <SignaturePad.Segment class={styles.Segment} />
      <SignaturePad.ClearTrigger class={styles.ClearTrigger}>
        <RotateCcwIcon />
      </SignaturePad.ClearTrigger>
      <SignaturePad.Guide class={styles.Guide} />
    </SignaturePad.Control>
  </SignaturePad.RootProvider>
</div>
