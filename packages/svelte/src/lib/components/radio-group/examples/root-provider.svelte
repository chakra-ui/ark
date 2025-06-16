<script>
  import { RadioGroup, useRadioGroup } from '@ark-ui/svelte/radio-group'

  const frameworks = ['React', 'Solid', 'Vue']

  const id = $props.id()
  const radioGroup = useRadioGroup({ id })
</script>

<button onclick={() => radioGroup().focus()}>Focus</button>

<RadioGroup.RootProvider value={radioGroup}>
  <RadioGroup.Label>Framework</RadioGroup.Label>
  <RadioGroup.Indicator />
  {#each frameworks as framework}
    <RadioGroup.Item value={framework}>
      <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  {/each}
</RadioGroup.RootProvider>
