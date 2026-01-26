<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'
  import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte'
  import styles from 'styles/number-input.module.css'
</script>

<NumberInput.Root class={styles.Root}>
  <NumberInput.Context>
    {#snippet render(context)}
      <NumberInput.Label class={styles.Label}>Value: {context().valueAsNumber}</NumberInput.Label>
    {/snippet}
  </NumberInput.Context>
  <NumberInput.Control class={styles.Control}>
    <NumberInput.Input class={styles.Input} />
    <div class={styles.TriggerGroup}>
      <NumberInput.IncrementTrigger class={styles.IncrementTrigger}>
        <ChevronUpIcon />
      </NumberInput.IncrementTrigger>
      <NumberInput.DecrementTrigger class={styles.DecrementTrigger}>
        <ChevronDownIcon />
      </NumberInput.DecrementTrigger>
    </div>
  </NumberInput.Control>
</NumberInput.Root>
