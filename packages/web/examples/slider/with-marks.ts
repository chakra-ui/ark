import '../../src/components/slider/index.js'

import styles from 'styles/slider.module.css'

const attr = (name: string, value?: string | number) => (value === undefined ? '' : `${name}="${value}"`)

interface SliderProps {
  defaultValue: number[]
}

const thumb = ({ index }: { index: number }) =>
  /* html */ `<ark-slider-thumb class="${styles.Thumb}" index="${index}"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>`

const slider = ({ defaultValue }: SliderProps, children: string[] = []) => /* html */ `
  <ark-slider class="${styles.Root}" default-value="${defaultValue.join(',')}">
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

const marks = [0, 25, 50, 75, 100]

const marker = ({ value }: { value: number }) =>
  /* html */ `<ark-slider-marker class="${styles.Marker}" value="${value}">${value}</ark-slider-marker>`

const markerGroup = (children: string[]) =>
  /* html */ `<ark-slider-marker-group class="${styles.MarkerGroup}">${children.join('')}</ark-slider-marker-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = slider({ defaultValue: [50] }, [markerGroup(marks.map((value) => marker({ value })))])
}
