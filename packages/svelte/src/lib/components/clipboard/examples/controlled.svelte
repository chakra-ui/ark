<script lang="ts">
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import { Clipboard } from '@ark-ui/svelte/clipboard'
  
  let url = $state('https://ark-ui.com')
  
  const handleUrlChange = () => {
    url = 'https://chakra-ui.com'
  }
</script>

<Clipboard.Root bind:value={url}>
  <Clipboard.Label>Copy this link</Clipboard.Label>
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
  
  <button onclick={handleUrlChange}>Change Url</button>
</Clipboard.Root>