import '@ark-ui/web/color-picker'

import styles from 'styles/color-picker.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-color-picker class="${styles.Root}" inline default-value="#eb5e41">
  <ark-color-picker-area class="${styles.Area}">
      <ark-color-picker-area-background class="${styles.AreaBackground}"></ark-color-picker-area-background>
      <ark-color-picker-area-thumb class="${styles.AreaThumb}"></ark-color-picker-area-thumb>
    </ark-color-picker-area>
  <div class="${styles.SliderGroup}">
    <span class="${styles.Swatch}">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-value-swatch class="${styles.ValueSwatch}"></ark-color-picker-value-swatch>
    </span>
    <div class="${styles.ChannelSliders}">
      <ark-color-picker-channel-slider class="${styles.ChannelSlider}" channel="hue">
      <ark-color-picker-channel-slider-track class="${styles.ChannelSliderTrack}"></ark-color-picker-channel-slider-track>
      <ark-color-picker-channel-slider-thumb class="${styles.ChannelSliderThumb}"></ark-color-picker-channel-slider-thumb>
    </ark-color-picker-channel-slider>
      <ark-color-picker-channel-slider class="${styles.ChannelSlider}" channel="alpha">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-channel-slider-track class="${styles.ChannelSliderTrack}"></ark-color-picker-channel-slider-track>
      <ark-color-picker-channel-slider-thumb class="${styles.ChannelSliderThumb}"></ark-color-picker-channel-slider-thumb>
    </ark-color-picker-channel-slider>
    </div>
  </div>
  </ark-color-picker>`
}
