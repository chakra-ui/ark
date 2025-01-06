<script lang="ts">
  import { Checkbox, useCheckbox } from '..'
  import CheckIcon from './check-icon.svelte'

  const checkbox = useCheckbox({
    onCheckedChange: (details) => {
      console.log('checked', details.checked)
    },
  })
</script>

<button onclick={() => checkbox().toggleChecked()}>Toggle Checkbox</button>

<Checkbox.RootProvider value={checkbox}>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.RootProvider>
