<script lang="ts">
  import { Clipboard } from '@ark-ui/svelte/clipboard'
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/clipboard.module.css'

  let url = $state('https://ark-ui.com')
</script>

<div class="stack">
  <Clipboard.Root class={styles.Root} bind:value={url}>
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

  <button class={button.Root} onclick={() => (url = 'https://chakra-ui.com')}>Change Url</button>
</div>
