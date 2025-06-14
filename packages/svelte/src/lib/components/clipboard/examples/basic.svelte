<script lang="ts">
  import { Clipboard } from '../'
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
</script>

<Clipboard.Root value="https://ark-ui.com">
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
</Clipboard.Root>
