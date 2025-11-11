<script lang="ts">
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import { Clipboard } from '@ark-ui/svelte/clipboard'
</script>

<Clipboard.Root value="https://ark-ui.com">
  <Clipboard.Label>Copy this link</Clipboard.Label>
  <Clipboard.Control>
    <Clipboard.Trigger>
      <Clipboard.Context>
        {#snippet render(clipboard)}
          <div>
            {#if clipboard().copied}
              <CheckIcon />
            {:else}
              <ClipboardCopyIcon />
            {/if}
            <span>
              {#if clipboard().copied}
                Copied!
              {:else}
                Copy
              {/if}
            </span>
            <small>Value: {clipboard().value}</small>
          </div>
        {/snippet}
      </Clipboard.Context>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.Root>
