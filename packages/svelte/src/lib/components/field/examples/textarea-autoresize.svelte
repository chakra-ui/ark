<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root>
  <Field.Label>Message</Field.Label>
  <Field.Textarea placeholder="Enter your message..." autoresize />
  <Field.HelperText>Please provide as much detail as possible</Field.HelperText>
</Field.Root>
