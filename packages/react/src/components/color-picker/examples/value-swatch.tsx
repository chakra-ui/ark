import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import styles from 'styles/color-picker.module.css'

export const ValueSwatch = () => {
  return (
    <ColorPicker.Root className={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Area className={styles.Area}>
        <ColorPicker.AreaBackground className={styles.AreaBackground} />
        <ColorPicker.AreaThumb className={styles.AreaThumb} />
      </ColorPicker.Area>
      <div className={styles.SliderGroup}>
        <div className={styles.Swatch}>
          <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
          <ColorPicker.ValueSwatch className={styles.ValueSwatch} />
        </div>
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
    </ColorPicker.Root>
  )
}
