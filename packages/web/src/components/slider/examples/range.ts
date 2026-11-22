import '@ark-ui/web/slider'

import styles from 'styles/slider.module.css'

const thumb = ({ index }: { index: number }) =>
  /* html */ `<ark-slider-thumb class="${styles.Thumb}" index="${index}"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-slider class="${styles.Root}" default-value="30,60">
      <div style="display: flex; justify-content: space-between">
        <ark-slider-label class="${styles.Label}">Label</ark-slider-label>
        <ark-slider-value-text class="${styles.ValueText}"></ark-slider-value-text>
      </div>
      <ark-slider-control class="${styles.Control}">
        <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
        ${thumb({ index: 0 })}${thumb({ index: 1 })}
      </ark-slider-control>
    </ark-slider>`
}
