<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root required>
  <Field.Label>
    Username
    <Field.RequiredIndicator />
  </Field.Label>
  <Field.Input placeholder="Enter your username" />
</Field.Root>
