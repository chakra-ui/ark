import '@ark-ui/web/slider'

import styles from 'styles/slider.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-slider class="${styles.Root}" default-value="40">
      <ark-slider-label class="${styles.Label}">Label</ark-slider-label>
      <ark-slider-control class="${styles.Control}">
        <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
        <ark-slider-thumb class="${styles.Thumb}" index="0"><ark-slider-dragging-indicator class="${styles.DraggingIndicator}"></ark-slider-dragging-indicator><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
      </ark-slider-control>
    </ark-slider>`
}
