<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon, MinusIcon } from 'lucide-svelte'

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
  <Checkbox.Root value={item.value}>
    <Checkbox.Label>{item.label}</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
{/snippet}

<div style="display: flex; flex-direction: column; gap: 10px;">
  <Checkbox.Root
    checked={indeterminate ? 'indeterminate' : allSelected}
    onCheckedChange={(e: { checked: boolean | 'indeterminate' }) => handleSelectAll(!!e.checked)}
  >
    <Checkbox.Label>Select All</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>

  <Checkbox.Group bind:value name="framework">
    {#each items as item (item.value)}
      {@render CheckboxItem(item)}
    {/each}
  </Checkbox.Group>

  <pre>Selected: {JSON.stringify(value)}</pre>
</div>
