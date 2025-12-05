<script lang="ts">
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import { RadioGroup } from '@ark-ui/svelte/radio-group'

  const frameworks = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'vue', label: 'Vue' },
    { id: 'svelte', label: 'Svelte' },
  ]
</script>

<Fieldset.Root>
  <Fieldset.Legend>Select a framework</Fieldset.Legend>
  <RadioGroup.Root name="framework">
    {#each frameworks as framework (framework.id)}
      <RadioGroup.Item value={framework.id}>
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>{framework.label}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    {/each}
  </RadioGroup.Root>
  <Fieldset.HelperText>Choose your preferred framework</Fieldset.HelperText>
  <Fieldset.ErrorText>Please select a framework</Fieldset.ErrorText>
</Fieldset.Root>
