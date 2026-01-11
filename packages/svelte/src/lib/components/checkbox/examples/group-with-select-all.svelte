<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon, MinusIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ]

  let value = $state<string[]>([])

  function handleSelectAll(checked: boolean) {
    value = checked ? items.map((item) => item.value) : []
  }

  const allSelected = $derived(value.length === items.length)
  const indeterminate = $derived(value.length > 0 && value.length < items.length)
</script>

{#snippet CheckboxItem(item: (typeof items)[number])}
  <Checkbox.Root class={styles.Root} value={item.value}>
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator class={styles.Indicator} indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class={styles.Label}>{item.label}</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
{/snippet}

<div style="display: flex; flex-direction: column; gap: 10px;">
  <output>Selected: {JSON.stringify(value)}</output>

  <Checkbox.Root
    class={styles.Root}
    checked={indeterminate ? 'indeterminate' : allSelected}
    onCheckedChange={(e) => handleSelectAll(!!e.checked)}
  >
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator class={styles.Indicator} indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class={styles.Label}>JSX Frameworks</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>

  <Checkbox.Group class={styles.Group} style="margin-inline-start: 1rem;" bind:value name="framework">
    {#each items as item (item.value)}
      {@render CheckboxItem(item)}
    {/each}
  </Checkbox.Group>
</div>
