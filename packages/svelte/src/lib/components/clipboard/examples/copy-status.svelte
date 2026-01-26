<script lang="ts">
  import { Clipboard } from '@ark-ui/svelte/clipboard'
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import styles from 'styles/clipboard.module.css'

  let copyCount = $state(0)
</script>

<Clipboard.Root
  class={styles.Root}
  value="https://ark-ui.com"
  onStatusChange={(details) => {
    if (details.copied) {
      copyCount += 1
    }
  }}
>
  <Clipboard.Control class={styles.Control}>
    <Clipboard.Trigger class={styles.Trigger}>
      <Clipboard.Indicator class={styles.Indicator}>
        {#snippet copied()}
          <CheckIcon />
        {/snippet}
        <ClipboardCopyIcon />
      </Clipboard.Indicator>
    </Clipboard.Trigger>
  </Clipboard.Control>
  <p>Copied {copyCount} times</p>
</Clipboard.Root>
