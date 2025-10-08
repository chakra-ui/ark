<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
</script>

<Checkbox.Root defaultChecked>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.Root>
