import type { Meta } from '@storybook/react'
import { ColorPicker } from './'
import './color-picker.css'

type ColorPickerType = typeof ColorPicker

const meta: Meta<ColorPickerType> = {
  title: 'ColorPicker',
  component: ColorPicker,
}

export default meta

export const Basic = () => {
  return (
    <ColorPicker.Root>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.ChannelInput channel="alpha" />
        <ColorPicker.Trigger>
          <ColorPicker.Swatch value="red" />
          <ColorPicker.TransparencyGrid size="10px" />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <ColorPicker.ChannelSlider channel="alpha">
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
            <ColorPicker.TransparencyGrid size="16px" />
          </ColorPicker.ChannelSlider>
          <ColorPicker.SwatchGroup>
            <ColorPicker.Swatch value="red" />
            <ColorPicker.Swatch value="green" />
            <ColorPicker.Swatch value="blue" />
          </ColorPicker.SwatchGroup>
          <ColorPicker.EyeDropperTrigger>Pick color</ColorPicker.EyeDropperTrigger>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker.Root>
  )
}
