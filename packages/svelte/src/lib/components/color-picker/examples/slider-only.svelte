<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import styles from 'styles/color-picker.module.css'
</script>

<ColorPicker.Root class={styles.Root} inline defaultValue={parseColor('#5dd016')}>
  <div class="hstack">
    <div class={styles.Swatch}>
      <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
      <ColorPicker.ValueSwatch class={styles.ValueSwatch} />
    </div>
    <ColorPicker.ValueText class={styles.ValueText} />
  </div>
  <ColorPicker.View class={styles.View} format="rgba">
    <div class={styles.ChannelSliderRow}>
      <span class={styles.ChannelSliderLabel}>R</span>
      <ColorPicker.ChannelSlider class={styles.ChannelSlider} channel="red">
        <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
        <ColorPicker.ChannelSliderTrack class={styles.ChannelSliderTrack} />
        <ColorPicker.ChannelSliderThumb class={styles.ChannelSliderThumb} />
      </ColorPicker.ChannelSlider>
    </div>
    <div class={styles.ChannelSliderRow}>
      <span class={styles.ChannelSliderLabel}>G</span>
      <ColorPicker.ChannelSlider class={styles.ChannelSlider} channel="green">
        <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
        <ColorPicker.ChannelSliderTrack class={styles.ChannelSliderTrack} />
        <ColorPicker.ChannelSliderThumb class={styles.ChannelSliderThumb} />
      </ColorPicker.ChannelSlider>
    </div>
    <div class={styles.ChannelSliderRow}>
      <span class={styles.ChannelSliderLabel}>B</span>
      <ColorPicker.ChannelSlider class={styles.ChannelSlider} channel="blue">
        <ColorPicker.TransparencyGrid class={styles.TransparencyGrid} />
        <ColorPicker.ChannelSliderTrack class={styles.ChannelSliderTrack} />
        <ColorPicker.ChannelSliderThumb class={styles.ChannelSliderThumb} />
      </ColorPicker.ChannelSlider>
    </div>
  </ColorPicker.View>
</ColorPicker.Root>
