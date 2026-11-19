<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'

  const props: Checkbox.RootProps = $props()
</script>

<Checkbox.Group>
  <Checkbox.Root {...props}>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control">
      <Checkbox.Indicator>✓</Checkbox.Indicator>
      <Checkbox.Indicator indeterminate>-</Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</Checkbox.Group>
