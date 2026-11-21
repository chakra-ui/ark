import '@ark-ui/web/date-input'

import styles from 'styles/date-input.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-date-input class="${styles.Root}">
    <ark-date-input-label class="${styles.Label}">Date</ark-date-input-label>
    <ark-date-input-control class="${styles.Control}">
      <ark-date-input-segment-group class="${styles.SegmentGroup}">
        <template><ark-date-input-segment class="${styles.Segment}"></ark-date-input-segment></template>
      </ark-date-input-segment-group>
    </ark-date-input-control>
    <ark-date-input-hidden-input></ark-date-input-hidden-input>
  </ark-date-input>`
}
