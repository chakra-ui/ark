<script lang="ts">
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import { Clipboard } from '@ark-ui/svelte/clipboard'
</script>

<Clipboard.Root value="https://ark-ui.com" timeout={5000}>
  <Clipboard.Label>Copy this link (5 second timeout)</Clipboard.Label>
  <Clipboard.Control>
    <Clipboard.Input />
    <Clipboard.Trigger>
      <Clipboard.Indicator>
        <ClipboardCopyIcon />
        {#snippet copied()}
          <CheckIcon />
        {/snippet}
      </Clipboard.Indicator>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.Root>