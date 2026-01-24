<script lang="ts">
  import { Checkbox, useCheckbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'
  import button from 'styles/button.module.css'

  const checkbox = useCheckbox()
</script>

<div class="vstack">
  <Checkbox.RootProvider class={styles.Root} value={checkbox}>
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.RootProvider>

  {#if checkbox().checked}
    <button type="button" class={button.Root} onclick={() => checkbox().setChecked(false)}>Uncheck</button>
  {:else}
    <button type="button" class={button.Root} onclick={() => checkbox().setChecked(true)}>Check</button>
  {/if}
</div>
