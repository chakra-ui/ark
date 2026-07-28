<script lang="ts">
  import { SignaturePad } from '@ark-ui/svelte/signature-pad'
  import RotateCcwIcon from 'lucide-svelte/icons/rotate-ccw'
  import button from 'styles/button.module.css'
  import styles from 'styles/signature-pad.module.css'

  let paths = $state<string[]>([])
</script>

<div class="stack">
  <output>paths: {paths.length}</output>
  <SignaturePad.Root class={styles.Root} bind:paths>
    <SignaturePad.Label class={styles.Label}>Sign below</SignaturePad.Label>
    <SignaturePad.Control class={styles.Control}>
      <SignaturePad.Segment class={styles.Segment} />
      <SignaturePad.ClearTrigger class={styles.ClearTrigger}>
        <RotateCcwIcon />
      </SignaturePad.ClearTrigger>
      <SignaturePad.Guide class={styles.Guide} />
    </SignaturePad.Control>
  </SignaturePad.Root>
  <button class={button.Root} onclick={() => (paths = [])}>Clear</button>
</div>
