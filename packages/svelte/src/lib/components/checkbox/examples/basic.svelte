<script lang="ts">
  import { Checkbox } from '..'
  import type { RootProps } from '../checkbox'
  import CheckIcon from './check-icon.svelte'

  const props: RootProps = $props()
</script>

<Checkbox.Root {...props}>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.Root>
