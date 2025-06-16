<script lang="ts">
  import { FocusTrap } from '@ark-ui/svelte/focus-trap'

  let trapped = $state(false)
  let inputNode: HTMLInputElement | null = $state(null)

  function getInputNode() {
    if (!inputNode) throw new Error('Input not found')
    return inputNode
  }
</script>

<div>
  <button onclick={() => (trapped = !trapped)}>
    {trapped ? 'End Trap' : 'Start Trap'}
  </button>
  <FocusTrap disabled={!trapped} initialFocus={getInputNode}>
    <div style="display: flex; flex-direction: column; gap: 1rem; padding-block: 1rem">
      <input type="text" placeholder="First input" />
      <input bind:this={inputNode} type="text" placeholder="Second input (initial focus)" />
      <textarea placeholder="textarea"></textarea>
      <button onclick={() => (trapped = false)}>End Trap</button>
    </div>
  </FocusTrap>
</div>
