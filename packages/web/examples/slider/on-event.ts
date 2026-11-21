import '@ark-ui/web/slider'
import styles from 'styles/slider.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-slider class="${styles.Root}" >
    <div style="display: flex; justify-content: space-between">
      <ark-slider-label class="${styles.Label}">Label</ark-slider-label>
      <ark-slider-value-text class="${styles.ValueText}"></ark-slider-value-text>
    </div>
    <ark-slider-control class="${styles.Control}">
      <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
      <ark-slider-thumb class="${styles.Thumb}" index="0"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
    </ark-slider-control>
    
  </ark-slider>
    <output data-change>valuechange: -</output>
    <output data-end>valuechangeend: -</output>
  `
  const slider = root.querySelector('ark-slider')!
  slider.addEventListener('valuechange', (event) => {
    root.querySelector('[data-change]')!.textContent = 'valuechange: ' + event.detail.value.join(', ')
  })
  slider.addEventListener('valuechangeend', (event) => {
    root.querySelector('[data-end]')!.textContent = 'valuechangeend: ' + event.detail.value.join(', ')
  })
}
