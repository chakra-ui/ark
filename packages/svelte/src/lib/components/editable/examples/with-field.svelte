<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root>
  <Editable.Root placeholder="Placeholder">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
