import { createElement, Check, Pipette } from 'lucide'

import '@ark-ui/web/color-picker'

import styles from 'styles/color-picker.module.css'

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const swatches = ['red', 'blue', 'green', 'orange']

const swatch = (color: string) => /* html */ `
  <ark-color-picker-swatch-trigger value="${color}">
    <button class="${styles.SwatchTrigger}">
      <ark-color-picker-swatch class="${styles.Swatch}" value="${color}">
        <ark-color-picker-swatch-indicator class="${styles.SwatchIndicator}">${icon(Check)}</ark-color-picker-swatch-indicator>
      </ark-color-picker-swatch>
    </button>
  </ark-color-picker-swatch-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-color-picker class="${styles.Root}" default-value="#eb5e41">
  <ark-color-picker-label class="${styles.Label}">Color</ark-color-picker-label>
  <ark-color-picker-control class="${styles.Control}">
    <ark-color-picker-channel-input channel="hex"><input class="${styles.Input}" /></ark-color-picker-channel-input>
    <ark-color-picker-channel-input channel="alpha"><input class="${styles.ChannelInput}" /></ark-color-picker-channel-input>
    <ark-color-picker-trigger>
      <button class="${styles.Trigger}">
        <span class="${styles.Swatch}">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-value-swatch class="${styles.ValueSwatch}"></ark-color-picker-value-swatch>
    </span>
      </button>
    </ark-color-picker-trigger>
  </ark-color-picker-control>
  <ark-color-picker-positioner class="${styles.Positioner}">
    <ark-color-picker-content class="${styles.Content}">
      <ark-color-picker-area class="${styles.Area}">
      <ark-color-picker-area-background class="${styles.AreaBackground}"></ark-color-picker-area-background>
      <ark-color-picker-area-thumb class="${styles.AreaThumb}"></ark-color-picker-area-thumb>
    </ark-color-picker-area>
      <div class="${styles.SliderGroup}">
    <ark-color-picker-eye-dropper-trigger>
      <button class="${styles.EyeDropperTrigger}">${icon(Pipette)}</button>
    </ark-color-picker-eye-dropper-trigger>
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
      <ark-color-picker-swatch-group class="${styles.SwatchGroup}">
    ${swatches.map(swatch).join('')}
  </ark-color-picker-swatch-group>
    </ark-color-picker-content>
  </ark-color-picker-positioner>
  <ark-color-picker-hidden-input></ark-color-picker-hidden-input>
  </ark-color-picker>`
}
