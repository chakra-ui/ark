<script lang="ts">
  import { Clipboard } from '@ark-ui/svelte/clipboard'
</script>

<Clipboard.Root value="https://ark-ui.com">
  <Clipboard.Context>
    {#snippet render(clipboard)}
      <button onclick={() => clipboard().copy()}>
        {clipboard().copied ? 'Copied!' : 'Copy URL'}
      </button>
    {/snippet}
  </Clipboard.Context>
</Clipboard.Root>
