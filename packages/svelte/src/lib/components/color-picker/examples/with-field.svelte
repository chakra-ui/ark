<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root>
  <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
    <ColorPicker.Label>Label</ColorPicker.Label>
    <ColorPicker.Control>
      <ColorPicker.ChannelInput channel="hex" />
      <ColorPicker.ChannelInput channel="alpha" />
      <ColorPicker.ValueText />
      <ColorPicker.Trigger>
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ValueSwatch />
      </ColorPicker.Trigger>
    </ColorPicker.Control>
    <ColorPicker.Positioner>
      <ColorPicker.Content />
    </ColorPicker.Positioner>
    <ColorPicker.HiddenInput />
  </ColorPicker.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
