<script lang="ts">
  import { Clipboard, useClipboard } from '@ark-ui/svelte/clipboard'
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'

  const clipboard = useClipboard(() => ({ value: 'https://ark-ui.com' }))
</script>

<Clipboard.RootProvider value={clipboard}>
  <Clipboard.Label>Copy this link</Clipboard.Label>
  <Clipboard.Control>
    <Clipboard.Input />
    <Clipboard.Trigger>
      <Clipboard.Indicator>
        {#snippet copied()}
          <CheckIcon />
        {/snippet}
        <ClipboardCopyIcon />
      </Clipboard.Indicator>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.RootProvider>
