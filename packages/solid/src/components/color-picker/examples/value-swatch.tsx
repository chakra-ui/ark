import { ColorPicker, parseColor } from '@ark-ui/solid/color-picker'
import styles from 'styles/color-picker.module.css'

export const ValueSwatch = () => {
  return (
    <ColorPicker.Root class={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Area class={styles.Area}>
        <ColorPicker.AreaBackground class={styles.AreaBackground} />
        <ColorPicker.AreaThumb class={styles.AreaThumb} />
      </ColorPicker.Area>
      <div class={styles.SliderGroup}>
        <div class={styles.Swatch}>
          <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
          <ColorPicker.ValueSwatch class={styles.ValueSwatch} />
        </div>
        <div class={styles.ChannelSliders}>
          <ColorPicker.ChannelSlider class={styles.ChannelSlider} channel="hue">
            <ColorPicker.ChannelSliderTrack class={styles.ChannelSliderTrack} />
            <ColorPicker.ChannelSliderThumb class={styles.ChannelSliderThumb} />
          </ColorPicker.ChannelSlider>
          <ColorPicker.ChannelSlider class={styles.ChannelSlider} channel="alpha">
            <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
            <ColorPicker.ChannelSliderTrack class={styles.ChannelSliderTrack} />
            <ColorPicker.ChannelSliderThumb class={styles.ChannelSliderThumb} />
          </ColorPicker.ChannelSlider>
        </div>
      </div>
    </ColorPicker.Root>
  )
}
