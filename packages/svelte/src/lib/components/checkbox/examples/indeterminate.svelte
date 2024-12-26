<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import CheckIcon from './check-icon.svelte'
  import MinusIcon from './minus-icon.svelte'
</script>

<Checkbox.Root checked="indeterminate">
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
    <Checkbox.Indicator indeterminate>
      <MinusIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.Root>
