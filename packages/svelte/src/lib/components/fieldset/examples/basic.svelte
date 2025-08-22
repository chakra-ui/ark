<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
</script>

<Fieldset.Root>
  <Fieldset.Legend>Legend</Fieldset.Legend>
  <Field.Input type="text" />
  <Fieldset.HelperText>Helper text</Fieldset.HelperText>
  <Fieldset.ErrorText>Error text</Fieldset.ErrorText>
</Fieldset.Root>
