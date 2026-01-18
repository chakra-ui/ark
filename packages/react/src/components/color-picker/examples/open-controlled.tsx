import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { PipetteIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/color-picker.module.css'

export const OpenControlled = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => setOpen(!open)}>
        Toggle
      </button>

      <ColorPicker.Root
        className={styles.Root}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        defaultValue={parseColor('#eb5e41')}
      >
        <ColorPicker.Label className={styles.Label}>Color</ColorPicker.Label>
        <ColorPicker.Control className={styles.Control}>
          <ColorPicker.ChannelInput className={styles.Input} channel="hex" />
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
