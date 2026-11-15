<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
    <ColorPicker.Control>
      <ColorPicker.ChannelInput channel="hex" />
      <ColorPicker.Trigger>Open</ColorPicker.Trigger>
    </ColorPicker.Control>
    <ColorPicker.HiddenInput />
  </ColorPicker.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
