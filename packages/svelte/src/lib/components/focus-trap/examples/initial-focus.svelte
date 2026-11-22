<script lang="ts">
  import { FocusTrap } from '@ark-ui/svelte/focus-trap'
  import button from 'styles/button.module.css'
  import field from 'styles/field.module.css'

  let trapped = $state(false)
  let inputNode: HTMLInputElement | null = $state(null)

  function getInputNode() {
    if (!inputNode) throw new Error('Input not found')
    return inputNode
  }
</script>

<div>
  <button class={button.Root} type="button" onclick={() => (trapped = !trapped)}>
    {trapped ? 'End Trap' : 'Start Trap'}
  </button>
  <FocusTrap disabled={!trapped} initialFocus={getInputNode}>
    <div class="stack" style="padding-block: 1rem">
      <input class={field.Input} type="text" placeholder="First input" />
      <input class={field.Input} bind:this={inputNode} type="text" placeholder="Second input (initial focus)" />
      <textarea class={field.Textarea} placeholder="textarea"></textarea>
      <button class={button.Root} type="button" onclick={() => (trapped = false)}>End Trap</button>
    </div>
  </FocusTrap>
</div>
