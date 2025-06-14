<script lang="ts">
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import { Clipboard } from '@ark-ui/svelte/clipboard'
</script>

<Clipboard.Root value="https://ark-ui.com">
  <Clipboard.Label>Copy this link</Clipboard.Label>
  <Clipboard.Control>
    <Clipboard.Input />
    <Clipboard.Trigger>
      <Clipboard.Context>
        {#snippet render(api)}
          {#if api().copied}
            <CheckIcon />
          {:else}
            <ClipboardCopyIcon />
          {/if}
        {/snippet}
      </Clipboard.Context>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.Root>
