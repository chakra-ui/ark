<script lang="ts">
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import { Clipboard } from '@ark-ui/svelte/clipboard'
</script>

<Clipboard.Root value="https://ark-ui.com">
  <Clipboard.ValueText />
  <Clipboard.Trigger>
    <Clipboard.Indicator>
      <ClipboardCopyIcon />
      {#snippet copied()}
        <CheckIcon />
      {/snippet}
    </Clipboard.Indicator>
    Copy
  </Clipboard.Trigger>
</Clipboard.Root>
