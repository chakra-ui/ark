<script lang="ts">
  import { PinInput, usePinInput } from '@ark-ui/svelte/pin-input'
  import styles from 'styles/pin-input.module.css'

  const id = $props.id()

  const pinInput = usePinInput({ id, onValueComplete: (e) => alert(e.valueAsString) })
</script>

<div class="stack">
  <button onclick={() => pinInput().focus()}>Focus</button>

  <PinInput.RootProvider value={pinInput} class={styles.Root}>
    <PinInput.Label class={styles.Label}>Label</PinInput.Label>
    <PinInput.Control class={styles.Control}>
      {#each [0, 1, 2] as id, index (id)}
        <PinInput.Input {index} class={styles.Input} />
      {/each}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.RootProvider>
</div>
