<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ]
</script>

<form
  onsubmit={(e) => {
    e.preventDefault()
    console.log(new FormData(e.currentTarget).getAll('framework'))
  }}
>
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
  <button type="submit">Submit</button>
</form>
