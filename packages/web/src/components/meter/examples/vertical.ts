import '@ark-ui/web/meter'

import styles from 'styles/meter.module.css'

const channels = ['L', 'R', 'C', 'Sub']

const sample = () => Math.round(20 + Math.random() * 80)

const channel = (name: string) => /* html */ `
  <ark-meter class="${styles.Root} ${styles.Graded}" orientation="vertical" value="50" low="60" high="85" optimum="30">
    <ark-meter-track class="${styles.Track}">
      <ark-meter-range class="${styles.Indicator}"></ark-meter-range>
    </ark-meter-track>
    <ark-meter-label class="${styles.Label}">${name}</ark-meter-label>
  </ark-meter>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = styles.Levels
  host.innerHTML = channels.map(channel).join('')

  const timer = setInterval(() => {
    if (!host.isConnected) {
      clearInterval(timer)
      return
    }
    for (const meterEl of host.querySelectorAll('ark-meter')) {
      meterEl.setAttribute('value', String(sample()))
    }
  }, 600)

  root.replaceChildren(host)
}
