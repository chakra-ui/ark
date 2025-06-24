<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ]

  let value = $state(['react'])
</script>

<Checkbox.Group bind:value name="framework">
  {#each items as item}
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

<pre>Selected: {JSON.stringify(value)}</pre>
