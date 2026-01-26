import { ColorPicker, parseColor, useColorPicker } from '@ark-ui/react/color-picker'
import { CheckIcon, PipetteIcon } from 'lucide-react'
import styles from 'styles/color-picker.module.css'

const swatches = ['red', 'blue', 'green', 'orange']

export const RootProvider = () => {
  const colorPicker = useColorPicker({ defaultValue: parseColor('#eb5e41') })

  return (
    <div className="stack">
      <output>Color: {colorPicker.valueAsString}</output>

      <ColorPicker.RootProvider className={styles.Root} value={colorPicker}>
        <ColorPicker.Label className={styles.Label}>Color</ColorPicker.Label>
        <ColorPicker.Control className={styles.Control}>
          <ColorPicker.ChannelInput className={styles.Input} channel="hex" />
          <ColorPicker.ChannelInput className={styles.ChannelInput} channel="alpha" />
          <ColorPicker.Trigger className={styles.Trigger}>
            <div className={styles.Swatch}>
              <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
              <ColorPicker.ValueSwatch className={styles.ValueSwatch} />
            </div>
          </ColorPicker.Trigger>
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content className={styles.Content}>
            <ColorPicker.Area className={styles.Area}>
              <ColorPicker.AreaBackground className={styles.AreaBackground} />
              <ColorPicker.AreaThumb className={styles.AreaThumb} />
            </ColorPicker.Area>
            <div className={styles.SliderGroup}>
              <ColorPicker.EyeDropperTrigger className={styles.EyeDropperTrigger}>
                <PipetteIcon />
              </ColorPicker.EyeDropperTrigger>
              <div className={styles.ChannelSliders}>
                <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="hue">
                  <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
                  <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
                </ColorPicker.ChannelSlider>
                <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="alpha">
                  <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
                  <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
                  <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
                </ColorPicker.ChannelSlider>
              </div>
            </div>
            <ColorPicker.SwatchGroup className={styles.SwatchGroup}>
              {swatches.map((color) => (
                <ColorPicker.SwatchTrigger key={color} className={styles.SwatchTrigger} value={color}>
                  <ColorPicker.Swatch className={styles.Swatch} value={color}>
                    <ColorPicker.SwatchIndicator className={styles.SwatchIndicator}>
                      <CheckIcon />
                    </ColorPicker.SwatchIndicator>
                  </ColorPicker.Swatch>
                </ColorPicker.SwatchTrigger>
              ))}
            </ColorPicker.SwatchGroup>
            <ColorPicker.View className={styles.View} format="rgba">
              <div className={styles.ChannelInputGroup}>
                <ColorPicker.ChannelInput className={styles.ChannelInput} channel="hex" />
                <ColorPicker.ChannelInput className={styles.ChannelInput} channel="alpha" />
              </div>
            </ColorPicker.View>
            <ColorPicker.View className={styles.View} format="hsla">
              <div className={styles.ChannelInputGroup}>
                <ColorPicker.ChannelInput className={styles.ChannelInput} channel="hue" />
                <ColorPicker.ChannelInput className={styles.ChannelInput} channel="saturation" />
                <ColorPicker.ChannelInput className={styles.ChannelInput} channel="lightness" />
              </div>
            </ColorPicker.View>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
        <ColorPicker.HiddenInput />
      </ColorPicker.RootProvider>
    </div>
  )
}
