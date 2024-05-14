import { PipetteIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { ColorPicker, IconButton, Input, Text } from '~/components/ui'

export const Demo = (props: ColorPicker.RootProps) => {
  return (
    <ColorPicker.Root {...props}>
      <ColorPicker.Context>
        {(api) => (
          <>
            <ColorPicker.Label>Color Picker</ColorPicker.Label>
            <ColorPicker.Control>
              <ColorPicker.ChannelInput channel="hex" asChild>
                <Input />
              </ColorPicker.ChannelInput>
              <ColorPicker.Trigger asChild>
                <IconButton variant="outline">
                  <ColorPicker.Swatch value={api.value} />
                </IconButton>
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <Stack gap="3">
                  <ColorPicker.Area>
                    <ColorPicker.AreaBackground />
                    <ColorPicker.AreaThumb />
                  </ColorPicker.Area>
                  <HStack gap="3">
                    <ColorPicker.EyeDropperTrigger asChild>
                      <IconButton size="xs" variant="outline" aria-label="Pick a color">
                        <PipetteIcon />
                      </IconButton>
                    </ColorPicker.EyeDropperTrigger>
                    <Stack gap="2" flex="1">
                      <ColorPicker.ChannelSlider channel="hue">
                        <ColorPicker.ChannelSliderTrack />
                        <ColorPicker.ChannelSliderThumb />
                      </ColorPicker.ChannelSlider>
                      <ColorPicker.ChannelSlider channel="alpha">
                        <ColorPicker.TransparencyGrid size="8px" />
                        <ColorPicker.ChannelSliderTrack />
                        <ColorPicker.ChannelSliderThumb />
                      </ColorPicker.ChannelSlider>
                    </Stack>
                  </HStack>
                  <HStack>
                    <ColorPicker.ChannelInput channel="hex" asChild>
                      <Input size="2xs" />
                    </ColorPicker.ChannelInput>
                    <ColorPicker.ChannelInput channel="alpha" asChild>
                      <Input size="2xs" />
                    </ColorPicker.ChannelInput>
                  </HStack>
                  <Stack gap="1.5">
                    <Text size="xs" fontWeight="medium" color="fg.default">
                      Saved Colors
                    </Text>
                    <ColorPicker.SwatchGroup>
                      {presets.map((color, id) => (
                        <ColorPicker.SwatchTrigger key={id} value={color}>
                          <ColorPicker.Swatch value={color} />
                        </ColorPicker.SwatchTrigger>
                      ))}
                    </ColorPicker.SwatchGroup>
                  </Stack>
                </Stack>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </>
        )}
      </ColorPicker.Context>
    </ColorPicker.Root>
  )
}

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
