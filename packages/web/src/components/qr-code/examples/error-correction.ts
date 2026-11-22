import '@ark-ui/web/qr-code'
import '@ark-ui/web/radio-group'

import styles from 'styles/qr-code.module.css'
import radio from 'styles/radio-group.module.css'

const levels = ['L', 'M', 'Q', 'H']

const radioItem = ({ value }: { value: string }) => /* html */ `
  <ark-radio-group-item value="${value}">
    <label class="${radio.Item}">
      <ark-radio-group-item-control class="${radio.ItemControl}"></ark-radio-group-item-control>
      <ark-radio-group-item-text class="${radio.ItemText}">${value}</ark-radio-group-item-text>
      <ark-radio-group-item-hidden-input></ark-radio-group-item-hidden-input>
    </label>
  </ark-radio-group-item>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <ark-qr-code class="${styles.Root}" default-value="http://ark-ui.com" error-correction="L">
    <ark-qr-code-frame>
      <svg class="${styles.Frame}"><path class="${styles.Pattern}"></path></svg>
      <ark-qr-code-pattern></ark-qr-code-pattern>
    </ark-qr-code-frame>
  </ark-qr-code>
  <ark-radio-group class="${radio.Root}" default-value="L" orientation="horizontal">
    <div class="hstack">
      ${levels.map((level) => radioItem({ value: level })).join('')}
    </div>
  </ark-radio-group>`
  const qrCode = host.querySelector('ark-qr-code')!
  host.querySelector('ark-radio-group')!.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    if (value) qrCode.setAttribute('error-correction', value)
  })
  root.replaceChildren(host)
}
