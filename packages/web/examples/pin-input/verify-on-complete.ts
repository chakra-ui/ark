import '../../src/components/pin-input/index.js'

import styles from 'styles/pin-input.module.css'

const expected = '1234'

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
    <ark-pin-input class="${styles.Root}" otp>
      <ark-pin-input-label class="${styles.Label}">Enter ${expected} to verify</ark-pin-input-label>
      <ark-pin-input-control class="${styles.Control}">
        ${Array.from({ length: 4 }, () => /* html */ `<ark-pin-input-input><input class="${styles.Input}" /></ark-pin-input-input>`).join('')}
      </ark-pin-input-control>
      <ark-pin-input-hidden-input></ark-pin-input-hidden-input>
    </ark-pin-input>
    <p hidden data-invalid>Invalid code</p>
    <p hidden data-verified>Code verified</p>`
  const el = host.querySelector('ark-pin-input')!
  const setStatus = (invalid: boolean, verified: boolean) => {
    el.toggleAttribute('invalid', invalid)
    host.querySelector<HTMLElement>('[data-invalid]')!.hidden = !invalid
    host.querySelector<HTMLElement>('[data-verified]')!.hidden = !verified
  }
  el.addEventListener('valuechange', () => setStatus(false, false))
  el.addEventListener('valuecomplete', (event) => {
    const matches = event.detail.valueAsString === expected
    setStatus(!matches, matches)
  })
  root.replaceChildren(host)
}
