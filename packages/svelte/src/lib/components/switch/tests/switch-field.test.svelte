<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Switch } from '@ark-ui/svelte/switch'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Switch.Root>
    <Switch.Control />
    <Switch.HiddenInput />
  </Switch.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
