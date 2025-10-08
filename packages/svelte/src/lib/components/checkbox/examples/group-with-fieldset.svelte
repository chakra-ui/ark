<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import { CheckIcon } from 'lucide-svelte'

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ]
</script>

<Fieldset.Root>
  <Fieldset.Legend>Select frameworks</Fieldset.Legend>
  <Checkbox.Group defaultValue={['react']} name="framework">
    {#each items as item (item.value)}
      <Checkbox.Root value={item.value}>
        <Checkbox.Label>{item.label}</Checkbox.Label>
        <Checkbox.Control>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    {/each}
  </Checkbox.Group>
  <Fieldset.HelperText>Choose your preferred frameworks</Fieldset.HelperText>
  <Fieldset.ErrorText>Error Text</Fieldset.ErrorText>
</Fieldset.Root>
