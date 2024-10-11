<script setup lang="ts">
import { ColorPicker, parseColor } from '@ark-ui/vue/color-picker'
import { Field } from '@ark-ui/vue/field'

const defaultValue = parseColor('hsl(20, 100%, 50%)')
</script>

<template>
  <Field.Root>
    <ColorPicker.Root :defaultValue>
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
</template>
