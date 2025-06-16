<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root disabled>
  <Field.Label>Label</Field.Label>
  <Field.Input value="Disabled input" />
  <Field.HelperText>This field is disabled</Field.HelperText>
</Field.Root>
