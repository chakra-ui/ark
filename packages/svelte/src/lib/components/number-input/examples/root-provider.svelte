<script lang="ts">
  import { NumberInput, useNumberInput } from '@ark-ui/svelte/number-input'
  import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte'
  import styles from 'styles/number-input.module.css'

  const id = $props.id()
  const numberInput = useNumberInput({ id })
</script>

<div class="stack">
  <output>valueAsNumber: {numberInput().valueAsNumber}</output>
  <NumberInput.RootProvider class={styles.Root} value={numberInput}>
    <NumberInput.Label class={styles.Label}>Label</NumberInput.Label>
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
  </NumberInput.RootProvider>
</div>
