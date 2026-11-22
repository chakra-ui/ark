<script lang="ts">
  import { FocusTrap } from '@ark-ui/svelte/focus-trap'
  import button from 'styles/button.module.css'
  import field from 'styles/field.module.css'

  let trapped = $state(false)
</script>

<button class={button.Root} type="button" onclick={() => (trapped = true)}>Start Trap</button>

<FocusTrap returnFocusOnDeactivate={false} disabled={!trapped}>
  <div class="stack" style="padding-block: 1rem">
    <input class={field.Input} type="text" placeholder="input" />
    <textarea class={field.Textarea} placeholder="textarea"></textarea>
    <button class={button.Root} type="button" onclick={() => (trapped = false)}>End Trap</button>
  </div>
</FocusTrap>
