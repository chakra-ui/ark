import { createElement, Pipette } from 'lucide'

import '@ark-ui/web/color-picker'

import styles from 'styles/color-picker.module.css'

const icon = (node: typeof Pipette) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <form class="stack">
  <ark-color-picker class="${styles.Root}" inline name="color" default-value="#eb5e41">
  <ark-color-picker-hidden-input></ark-color-picker-hidden-input>
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
  </ark-color-picker>
  <button type="submit">Submit</button>
  <output data-submitted></output>
  </form>`

  const form = root.querySelector('form')!
  const output = root.querySelector<HTMLElement>('[data-submitted]')!
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    output.textContent = `color: ${new FormData(form).get('color')}`
  })
}
