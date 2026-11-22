import '@ark-ui/web/color-picker'

import styles from 'styles/color-picker.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-color-picker class="${styles.Root}" inline default-value="#5dd016">
  <div class="hstack">
    <span class="${styles.Swatch}">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-value-swatch class="${styles.ValueSwatch}"></ark-color-picker-value-swatch>
    </span>
    <ark-color-picker-value-text class="${styles.ValueText}"></ark-color-picker-value-text>
  </div>
  <ark-color-picker-view class="${styles.View}" format="rgba">
    <div class="${styles.ChannelSliderRow}">
      <span class="${styles.ChannelSliderLabel}">R</span>
      <ark-color-picker-channel-slider class="${styles.ChannelSlider}" channel="red">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-channel-slider-track class="${styles.ChannelSliderTrack}"></ark-color-picker-channel-slider-track>
      <ark-color-picker-channel-slider-thumb class="${styles.ChannelSliderThumb}"></ark-color-picker-channel-slider-thumb>
    </ark-color-picker-channel-slider>
    </div>
    <div class="${styles.ChannelSliderRow}">
      <span class="${styles.ChannelSliderLabel}">G</span>
      <ark-color-picker-channel-slider class="${styles.ChannelSlider}" channel="green">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-channel-slider-track class="${styles.ChannelSliderTrack}"></ark-color-picker-channel-slider-track>
      <ark-color-picker-channel-slider-thumb class="${styles.ChannelSliderThumb}"></ark-color-picker-channel-slider-thumb>
    </ark-color-picker-channel-slider>
    </div>
    <div class="${styles.ChannelSliderRow}">
      <span class="${styles.ChannelSliderLabel}">B</span>
      <ark-color-picker-channel-slider class="${styles.ChannelSlider}" channel="blue">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-channel-slider-track class="${styles.ChannelSliderTrack}"></ark-color-picker-channel-slider-track>
      <ark-color-picker-channel-slider-thumb class="${styles.ChannelSliderThumb}"></ark-color-picker-channel-slider-thumb>
    </ark-color-picker-channel-slider>
    </div>
    <div class="${styles.ChannelSliderRow}">
      <span class="${styles.ChannelSliderLabel}">A</span>
      <ark-color-picker-channel-slider class="${styles.ChannelSlider}" channel="alpha">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-channel-slider-track class="${styles.ChannelSliderTrack}"></ark-color-picker-channel-slider-track>
      <ark-color-picker-channel-slider-thumb class="${styles.ChannelSliderThumb}"></ark-color-picker-channel-slider-thumb>
    </ark-color-picker-channel-slider>
    </div>
  </ark-color-picker-view>
  </ark-color-picker>`
}
