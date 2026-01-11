<script lang="ts">
  import { PinInput } from '@ark-ui/svelte/pin-input'
  import styles from 'styles/pin-input.module.css'
</script>

<PinInput.Root class={styles.Root} blurOnComplete>
  <PinInput.Label class={styles.Label}>Label</PinInput.Label>
  <PinInput.Control class={styles.Control}>
    {#each [0, 1, 2] as id, index (id)}
      <PinInput.Input {index} class={styles.Input} />
    {/each}
  </PinInput.Control>
  <PinInput.HiddenInput />
</PinInput.Root>
