<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Field } from '@ark-ui/svelte/field'
  import { Switch } from '@ark-ui/svelte/switch'

  const props: Field.RootProps = $props()
</script>

<Field.Root {...props}>
  <Switch.Root>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
