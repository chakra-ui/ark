import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import styles from 'styles/color-picker.module.css'

export const SliderOnly = () => {
  return (
    <ColorPicker.Root className={styles.Root} inline defaultValue={parseColor('#5dd016')}>
      <div className="hstack">
        <div className={styles.Swatch}>
          <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
          <ColorPicker.ValueSwatch className={styles.ValueSwatch} />
        </div>
        <ColorPicker.ValueText className={styles.ValueText} />
      </div>
      <ColorPicker.View className={styles.View} format="rgba">
        <div className={styles.ChannelSliderRow}>
          <span className={styles.ChannelSliderLabel}>R</span>
          <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="red">
            <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
            <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
            <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
          </ColorPicker.ChannelSlider>
        </div>
        <div className={styles.ChannelSliderRow}>
          <span className={styles.ChannelSliderLabel}>G</span>
          <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="green">
            <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
            <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
            <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
          </ColorPicker.ChannelSlider>
        </div>
        <div className={styles.ChannelSliderRow}>
          <span className={styles.ChannelSliderLabel}>B</span>
          <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="blue">
            <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
            <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
            <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
          </ColorPicker.ChannelSlider>
        </div>
      </ColorPicker.View>
    </ColorPicker.Root>
  )
}
