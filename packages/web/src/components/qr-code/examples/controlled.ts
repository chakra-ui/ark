import '@ark-ui/web/qr-code'

import button from 'styles/button.module.css'
import styles from 'styles/qr-code.module.css'

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <ark-qr-code class="${styles.Root}" value="http://ark-ui.com">
    <ark-qr-code-frame>
      <svg class="${styles.Frame}"><path class="${styles.Pattern}"></path></svg>
      <ark-qr-code-pattern></ark-qr-code-pattern>
    </ark-qr-code-frame>
  </ark-qr-code>
  <button class="${button.Root}" type="button">Set to chakra-ui.com</button>
  <output>value: http://ark-ui.com</output>`
  const el = host.querySelector('ark-qr-code')!
  const output = host.querySelector('output')!
  const setValue = (value: string) => {
    el.setAttribute('value', value)
    output.textContent = `value: ${value}`
  }
  el.addEventListener('valuechange', (event) => setValue(event.detail.value))
  host.querySelector('button')!.addEventListener('click', () => setValue('https://chakra-ui.com'))
  root.replaceChildren(host)
}
