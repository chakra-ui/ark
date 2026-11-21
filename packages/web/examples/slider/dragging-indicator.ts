import '../../src/components/slider/index.js'

import styles from 'styles/slider.module.css'

const attr = (name: string, value?: string | number) => (value === undefined ? '' : `${name}="${value}"`)

interface SliderProps {
  defaultValue: number[]
  valueText?: boolean
  indicator?: boolean
}

const thumb = ({ index, indicator = false }: { index: number; indicator?: boolean }) =>
  /* html */ `<ark-slider-thumb class="${styles.Thumb}" index="${index}">${indicator ? /* html */ `<ark-slider-dragging-indicator class="${styles.DraggingIndicator}"></ark-slider-dragging-indicator>` : ''}<ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>`

const slider = (
  { defaultValue, valueText = true, indicator = false }: SliderProps,
  children: string[] = [],
) => /* html */ `
  <ark-slider class="${styles.Root}" default-value="${defaultValue.join(',')}">
    ${
      valueText
        ? /* html */ `<div style="display: flex; justify-content: space-between">
      <ark-slider-label class="${styles.Label}">Label</ark-slider-label>
      <ark-slider-value-text class="${styles.ValueText}"></ark-slider-value-text>
    </div>`
        : /* html */ `<ark-slider-label class="${styles.Label}">Label</ark-slider-label>`
    }
    <ark-slider-control class="${styles.Control}">
      <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
      ${defaultValue.map((_, index) => thumb({ index, indicator })).join('')}
    </ark-slider-control>
    ${children.join('')}
  </ark-slider>`

export function mount(root: HTMLElement) {
  root.innerHTML = slider({ defaultValue: [40], valueText: false, indicator: true })
}
