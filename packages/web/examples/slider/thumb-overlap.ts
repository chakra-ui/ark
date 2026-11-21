import '../../src/components/slider/index.js'

import styles from 'styles/slider.module.css'

const attr = (name: string, value?: string | number) => (value === undefined ? '' : `${name}="${value}"`)

interface SliderProps {
  minStepsBetweenThumbs?: number
  defaultValue: number[]
}

const thumb = ({ index }: { index: number }) =>
  /* html */ `<ark-slider-thumb class="${styles.Thumb}" index="${index}"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>`

const slider = ({ minStepsBetweenThumbs, defaultValue }: SliderProps, children: string[] = []) => /* html */ `
  <ark-slider class="${styles.Root}" ${attr('min-steps-between-thumbs', minStepsBetweenThumbs)} default-value="${defaultValue.join(',')}">
    <div style="display: flex; justify-content: space-between">
      <ark-slider-label class="${styles.Label}">Label</ark-slider-label>
      <ark-slider-value-text class="${styles.ValueText}"></ark-slider-value-text>
    </div>
    <ark-slider-control class="${styles.Control}">
      <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
      ${defaultValue.map((_, index) => thumb({ index })).join('')}
    </ark-slider-control>
    ${children.join('')}
  </ark-slider>`

export function mount(root: HTMLElement) {
  root.innerHTML = slider({ minStepsBetweenThumbs: 5, defaultValue: [25, 60] })
}
