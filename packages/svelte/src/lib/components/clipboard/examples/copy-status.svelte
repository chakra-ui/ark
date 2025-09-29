<script lang="ts">
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import { Clipboard } from '@ark-ui/svelte/clipboard'

  let copyCount = $state(0)
</script>

<Clipboard.Root
  value="https://ark-ui.com"
  onStatusChange={(details) => {
    if (details.copied) {
      copyCount += 1
    }
  }}
>
  <Clipboard.Trigger>
    <Clipboard.Indicator>
      <ClipboardCopyIcon />
      {#snippet copied()}
        <CheckIcon />
      {/snippet}
    </Clipboard.Indicator>
    Copy
  </Clipboard.Trigger>
  <p>Copied {copyCount} times</p>
</Clipboard.Root>
