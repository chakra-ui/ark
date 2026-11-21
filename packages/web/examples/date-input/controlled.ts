import '../../src/components/date-input/index.js'

import styles from 'styles/date-input.module.css'

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <ark-date-input class="${styles.Root}" value="2024-06-15">
    <ark-date-input-label class="${styles.Label}">Date</ark-date-input-label>
    <ark-date-input-control class="${styles.Control}">
      <ark-date-input-segment-group class="${styles.SegmentGroup}">
        <template><ark-date-input-segment class="${styles.Segment}"></ark-date-input-segment></template>
      </ark-date-input-segment-group>
    </ark-date-input-control>
    <ark-date-input-hidden-input></ark-date-input-hidden-input>
  </ark-date-input>
  <output>Value: 2024-06-15</output>`
  const dateInput = host.querySelector('ark-date-input')!
  dateInput.addEventListener('valuechange', (event) => {
    const value = event.detail.value.map(String)
    dateInput.setAttribute('value', value.join(','))
    host.querySelector('output')!.textContent = `Value: ${value.join(', ') || '-'}`
  })
  root.replaceChildren(host)
}
