import '@ark-ui/web/meter'

import styles from 'styles/meter.module.css'

const servers = [
  { name: 'api-1', load: 32 },
  { name: 'api-2', load: 68 },
  { name: 'api-3', load: 91 },
]

const server = ({ name, load }: { name: string; load: number }) => /* html */ `
  <ark-meter class="${styles.Root} ${styles.Graded}" default-value="${load}" low="50" high="80" optimum="0">
    <ark-meter-label class="${styles.Label}">${name}</ark-meter-label>
    <ark-meter-value-text class="${styles.ValueText}"></ark-meter-value-text>
    <ark-meter-track class="${styles.Track}">
      <ark-meter-range class="${styles.Indicator}"></ark-meter-range>
    </ark-meter-track>
  </ark-meter>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Stack}">
    ${servers.map(server).join('')}
  </div>`
}
