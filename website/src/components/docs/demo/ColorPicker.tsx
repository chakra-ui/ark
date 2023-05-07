import { Divider } from '@/components/shared/Divider'
import { IconButton } from '@/components/shared/IconButton'
import { Text } from '@/components/shared/Text'
import { Stack } from '@/panda/jsx'
import { colorPicker, input } from '@/panda/recipes'
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSliderThumb,
  ColorPickerSliderTrack,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
} from '@ark-ui/react'
import { CgColorPicker } from 'react-icons/cg'

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

export const DemoColorPicker = () => {
  return (
    <ColorPicker defaultValue="hsl(10, 81%, 59%)">
      {(api) => {
        const [hue, saturation, lightness] = api.channels
        return (
          <ColorPickerContent className={colorPicker()}>
            <ColorPickerArea xChannel={saturation} yChannel={lightness}>
              <ColorPickerAreaGradient />
              <ColorPickerAreaThumb />
            </ColorPickerArea>

            <Stack gap="4" p="4">
              <Stack direction="row" gap="4" align="center">
                <ColorPickerEyeDropperTrigger asChild>
                  <IconButton
                    size="xs"
                    variant="tertiary"
                    aria-label="Pick color"
                    icon={<CgColorPicker style={{ fontSize: '20px' }} />}
                  />
                </ColorPickerEyeDropperTrigger>
                <Stack gap="4" width="full">
                  <ColorPickerSliderTrack channel={hue}>
                    <ColorPickerSliderThumb />
                  </ColorPickerSliderTrack>
                  <ColorPickerSliderTrack channel="alpha">
                    <ColorPickerSliderThumb />
                  </ColorPickerSliderTrack>
                </Stack>
              </Stack>
              <Stack direction="row" gap="4" align="center">
                <ColorPickerChannelInput channel="hex" className={input({ size: 'xs' })} />
                <ColorPickerChannelInput channel="alpha" className={input({ size: 'xs' })} />
              </Stack>
            </Stack>
            <Divider />
            <Stack gap="2" p="4">
              <Text textStyle="xs" fontWeight="medium">
                Preset Colors
              </Text>
              <ColorPickerSwatchGroup>
                {presets.map((color) => (
                  <ColorPickerSwatch key={color} value={color} />
                ))}
              </ColorPickerSwatchGroup>
            </Stack>
          </ColorPickerContent>
        )
      }}
    </ColorPicker>
  )
}
