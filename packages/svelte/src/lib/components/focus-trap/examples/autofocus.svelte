<script lang="ts">
  import { FocusTrap } from '@ark-ui/svelte/focus-trap'

  let trapped = $state(false)
  let buttonNode: HTMLButtonElement | null = $state(null)

  function getButtonNode() {
    if (!buttonNode) throw new Error('Button not found')
    return buttonNode
  }
</script>

<div>
  <button bind:this={buttonNode} onclick={() => (trapped = !trapped)}>
    {trapped ? 'End Trap' : 'Start Trap'}
  </button>
  {#if trapped}
    <FocusTrap disabled={!trapped} setReturnFocus={getButtonNode}>
      <div style="display: flex; flex-direction: column; gap: 1rem; padding-block: 1rem">
        <input type="text" placeholder="Regular input" />
        <!-- svelte-ignore a11y_autofocus -->
        <input type="text" placeholder="Autofocused input" autofocus />
        <button onclick={() => (trapped = false)}>End Trap</button>
      </div>
    </FocusTrap>
  {/if}
</div>
