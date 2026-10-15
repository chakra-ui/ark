<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Editable.Root defaultEdit>
    <Editable.Area>
      <Editable.Input />
    </Editable.Area>
  </Editable.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
