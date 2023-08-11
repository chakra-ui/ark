import { IoMdColorFilter } from 'react-icons/io'
import { HStack, Stack } from 'styled-system/jsx'
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSliderBackground,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatch,
  ColorPickerSwatchBackground,
  ColorPickerSwatchGroup,
} from '~/components/ui/color-picker'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'
import { Typography } from '~/components/ui/typography'

const presets = [
  'hsl(10, 81%, 59%)',
  'hsl(60, 81%, 59%)',
  'hsl(100, 81%, 59%)',
  'hsl(175, 81%, 59%)',
  'hsl(190, 81%, 59%)',
  'hsl(205, 81%, 59%)',
  'hsl(220, 81%, 59%)',
  'hsl(250, 81%, 59%)',
  'hsl(280, 81%, 59%)',
  'hsl(350, 81%, 59%)',
]

export const ColorPickerDemo = () => {
  return (
    <ColorPicker defaultValue="hsl(10, 81%, 59%)">
      {(api) => {
        const [hue, saturation, lightness] = api.channels
        return (
          <ColorPickerContent>
            <Stack gap="4">
              <ColorPickerArea xChannel={saturation} yChannel={lightness}>
                <ColorPickerAreaGradient />
                <ColorPickerAreaThumb />
              </ColorPickerArea>

              <HStack gap="3">
                <ColorPickerEyeDropperTrigger asChild>
                  <IconButton size="xs" variant="secondary" aria-label="Pick color">
                    <IoMdColorFilter />
                  </IconButton>
                </ColorPickerEyeDropperTrigger>
                <Stack gap="3" width="full">
                  <ColorPickerChannelSliderTrack channel={hue}>
                    <ColorPickerChannelSliderBackground />
                    <ColorPickerChannelSliderThumb />
                  </ColorPickerChannelSliderTrack>
                  <ColorPickerChannelSliderTrack channel="alpha">
                    <ColorPickerChannelSliderBackground />
                    <ColorPickerChannelSliderThumb />
                  </ColorPickerChannelSliderTrack>
                </Stack>
              </HStack>
              <HStack gap="2">
                <ColorPickerChannelInput channel="hex" asChild>
                  <Input size="2xs" />
                </ColorPickerChannelInput>
                <ColorPickerChannelInput channel="alpha" asChild>
                  <Input size="2xs" />
                </ColorPickerChannelInput>
              </HStack>

              <Typography textStyle="xs" fontWeight="medium">
                Saved Colors
              </Typography>
              <ColorPickerSwatchGroup>
                {presets.map((color) => (
                  <ColorPickerSwatch key={color} value={color} aria-label={`Pick color ${color}`}>
                    <ColorPickerSwatchBackground />
                  </ColorPickerSwatch>
                ))}
              </ColorPickerSwatchGroup>
            </Stack>
          </ColorPickerContent>
        )
      }}
    </ColorPicker>
  )
}
