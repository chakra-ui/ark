<script lang="ts">
  import { RadioGroup } from '@ark-ui/svelte/radio-group'

  const frameworks = ['React', 'Solid', 'Vue', 'Svelte']
</script>

<RadioGroup.Root>
  <RadioGroup.Label>Framework</RadioGroup.Label>
  <RadioGroup.Indicator />
  {#each frameworks as framework}
    <RadioGroup.Item value={framework}>
      <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  {/each}
</RadioGroup.Root>
