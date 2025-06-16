<script>
  import { RadioGroup } from '@ark-ui/svelte/radio-group'

  const frameworks = ['React', 'Solid', 'Vue']
</script>

<RadioGroup.Root defaultValue="Solid">
  <RadioGroup.Label>Framework</RadioGroup.Label>
  {#each frameworks as framework}
    <RadioGroup.Item value={framework}>
      <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  {/each}
</RadioGroup.Root>
