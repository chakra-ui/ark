<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
</script>

<Fieldset.Root disabled>
  <Fieldset.Legend>Legend</Fieldset.Legend>
  <Field.Root data-testid="field">
    <Field.Label>Label</Field.Label>
  </Field.Root>
</Fieldset.Root>
