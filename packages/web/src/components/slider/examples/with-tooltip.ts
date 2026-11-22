import '@ark-ui/web/slider'
import '@ark-ui/web/tooltip'

import styles from 'styles/slider.module.css'

import tooltipStyles from 'styles/tooltip.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-slider class="${styles.Root}" default-value="40">
    <ark-slider-label class="${styles.Label}">Volume</ark-slider-label>
    <ark-slider-control class="${styles.Control}">
      <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
      <ark-tooltip open="false" open-delay="0" close-on-click="false" close-on-pointer-down="false" placement="top">
        <ark-tooltip-trigger as-child>
          <ark-slider-thumb class="${styles.Thumb}" index="0"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
        </ark-tooltip-trigger>
        <ark-tooltip-positioner class="${tooltipStyles.Positioner}">
          <ark-tooltip-content class="${tooltipStyles.Content}">40</ark-tooltip-content>
        </ark-tooltip-positioner>
      </ark-tooltip>
    </ark-slider-control>
  </ark-slider>`

  const slider = root.querySelector('ark-slider')!
  const tooltip = root.querySelector('ark-tooltip')!
  const content = root.querySelector('ark-tooltip-content')!
  const thumbId = `volume-thumb-${crypto.randomUUID()}`
  let hovered = false
  let dragging = false

  const render = () => tooltip.setAttribute('open', String(hovered || dragging))

  slider.ids = { thumb: () => thumbId }
  tooltip.ids = { trigger: thumbId }
  tooltip.addEventListener('openchange', (event) => {
    hovered = event.detail.open
    render()
  })
  slider.addEventListener('valuechange', (event) => {
    dragging = !!slider.state?.dragging
    content.textContent = String(event.detail.value[0])
    render()
  })
  slider.addEventListener('valuechangeend', () => {
    dragging = false
    render()
  })
}
