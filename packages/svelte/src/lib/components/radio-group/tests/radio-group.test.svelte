<script lang="ts">
  import { RadioGroup } from '@ark-ui/svelte/radio-group'

  const props: RadioGroup.RootProps = $props()

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
</script>

<RadioGroup.Root {...props}>
  <RadioGroup.Label>Framework</RadioGroup.Label>
  <RadioGroup.Indicator />
  {#each items as item (item.value)}
    <RadioGroup.Item value={item.value} disabled={item.disabled} data-testid={`item-${item.value}`}>
      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  {/each}
</RadioGroup.Root>
