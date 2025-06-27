<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
</script>

<Fieldset.Root>
  <Fieldset.Legend>Legend</Fieldset.Legend>
  <Fieldset.HelperText>Helper text</Fieldset.HelperText>
  <Fieldset.ErrorText>Error text</Fieldset.ErrorText>
  <Field.Root>
    <Checkbox.Root>
      <Checkbox.Label>Label</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>✔️</Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Field.HelperText>Field Heler Text</Field.HelperText>
    <Field.ErrorText>Field Error Text</Field.ErrorText>
  </Field.Root>
</Fieldset.Root>
