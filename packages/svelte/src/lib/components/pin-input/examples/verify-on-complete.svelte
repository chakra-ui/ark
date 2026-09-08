<script lang="ts">
  import { PinInput } from '@ark-ui/svelte/pin-input'
  import styles from 'styles/pin-input.module.css'

  const expected = '1234'
  let invalid = $state(false)
  let verified = $state(false)
</script>

<div class="stack">
  <PinInput.Root
    class={styles.Root}
    count={4}
    otp
    {invalid}
    onValueChange={() => {
      invalid = false
      verified = false
    }}
    onValueComplete={(details) => {
      const matches = details.valueAsString === expected
      invalid = !matches
      verified = matches
    }}
  >
    <PinInput.Label class={styles.Label}>Enter {expected} to verify</PinInput.Label>
    <PinInput.Control class={styles.Control}>
      {#each [0, 1, 2, 3] as id, index (id)}
        <PinInput.Input {index} class={styles.Input} />
      {/each}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
  {#if invalid}
    <p>Invalid code</p>
  {/if}
  {#if verified}
    <p>Code verified</p>
  {/if}
</div>
