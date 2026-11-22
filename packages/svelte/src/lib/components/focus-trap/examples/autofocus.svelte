<script lang="ts">
  import { FocusTrap } from '@ark-ui/svelte/focus-trap'
  import button from 'styles/button.module.css'
  import field from 'styles/field.module.css'

  let trapped = $state(false)
  let buttonNode: HTMLButtonElement | null = $state(null)

  function getButtonNode() {
    if (!buttonNode) throw new Error('Button not found')
    return buttonNode
  }
</script>

<div>
  <button class={button.Root} type="button" bind:this={buttonNode} onclick={() => (trapped = !trapped)}>
    {trapped ? 'End Trap' : 'Start Trap'}
  </button>
  {#if trapped}
    <FocusTrap disabled={!trapped} setReturnFocus={getButtonNode}>
      <div class="stack" style="padding-block: 1rem">
        <input class={field.Input} type="text" placeholder="Regular input" />
        <!-- svelte-ignore a11y_autofocus -->
        <input class={field.Input} type="text" placeholder="Autofocused input" autofocus />
        <button class={button.Root} type="button" onclick={() => (trapped = false)}>End Trap</button>
      </div>
    </FocusTrap>
  {/if}
</div>
