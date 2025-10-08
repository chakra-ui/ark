<script lang="ts">
  import { Checkbox, useCheckbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'

  const checkbox = useCheckbox()
</script>

<button type="button" onclick={() => checkbox.setChecked(true)}>Check</button>
<button type="button" onclick={() => checkbox.setChecked(false)}>Uncheck</button>

<Checkbox.RootProvider value={checkbox}>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.RootProvider>
