<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { Field } from '@ark-ui/svelte/field'
  import { CheckIcon, MinusIcon } from 'lucide-svelte'
</script>

<Field.Root>
  <Checkbox.Root>
    <Checkbox.Label>Label</Checkbox.Label>
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
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
