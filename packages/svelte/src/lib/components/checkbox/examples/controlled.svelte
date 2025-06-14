<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'

  let checked = $state(false)
</script>

<Checkbox.Root bind:checked>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label>Controlled checkbox</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>
