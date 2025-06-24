<script>
  import { RadioGroup } from '@ark-ui/svelte/radio-group'

  const frameworks = ['React', 'Solid', 'Vue', 'Svelte']
</script>

<RadioGroup.Root disabled>
  <RadioGroup.Label>Framework</RadioGroup.Label>
  {#each frameworks as framework}
    <RadioGroup.Item value={framework}>
      <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  {/each}
</RadioGroup.Root>
