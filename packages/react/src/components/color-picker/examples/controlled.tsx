import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { PipetteIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/color-picker.module.css'

export const Controlled = () => {
  const [color, setColor] = useState(() => parseColor('hsl(20, 100%, 50%)'))

  return (
    <div className="stack">
      <output>Selected color: {color.toString('hex')}</output>

      <ColorPicker.Root className={styles.Root} value={color} onValueChange={(e) => setColor(e.value)}>
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
          </ColorPicker.Content>
        </ColorPicker.Positioner>

        <ColorPicker.HiddenInput />
      </ColorPicker.Root>
    </div>
  )
}
