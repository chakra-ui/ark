<script lang="ts">
  import { Checkbox, useCheckbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'

  const id = $props.id()
  const checkbox = useCheckbox({ id })
</script>

<span>{checkbox().checked ? 'Checked' : 'UnChecked'}</span>

<Checkbox.RootProvider value={checkbox}>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.RootProvider>
