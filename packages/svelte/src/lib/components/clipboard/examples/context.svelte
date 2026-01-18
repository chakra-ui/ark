<script lang="ts">
  import { Clipboard } from '@ark-ui/svelte/clipboard'
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/clipboard.module.css'
</script>

<Clipboard.Root class={styles.Root} value="https://ark-ui.com">
  <Clipboard.Label class={styles.Label}>Copy this link</Clipboard.Label>
  <Clipboard.Context>
    {#snippet render(clipboard)}
      <button class={button.Root} onclick={() => clipboard().copy()}>
        {#if clipboard().copied}
          <CheckIcon />
          Copied!
        {:else}
          <ClipboardCopyIcon />
          Copy
        {/if}
      </button>
    {/snippet}
  </Clipboard.Context>
</Clipboard.Root>
