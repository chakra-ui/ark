<script lang="ts">
  import { Clipboard } from '@ark-ui/svelte/clipboard'
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import styles from 'styles/clipboard.module.css'
</script>

<Clipboard.Root class={styles.Root} value="https://ark-ui.com">
  <Clipboard.Label class={styles.Label}>Copy this link</Clipboard.Label>
  <Clipboard.Control class={styles.Control}>
    <Clipboard.Input class={styles.Input} />
    <Clipboard.Trigger class={styles.Trigger}>
      <Clipboard.Indicator class={styles.Indicator}>
        {#snippet copied()}
          <CheckIcon />
        {/snippet}
        <ClipboardCopyIcon />
      </Clipboard.Indicator>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.Root>
