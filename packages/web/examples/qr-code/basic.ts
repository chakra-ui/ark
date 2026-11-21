import '../../src/components/qr-code/index.js'

import styles from 'styles/qr-code.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-qr-code class="${styles.Root}" default-value="http://ark-ui.com">
    <ark-qr-code-frame>
      <svg class="${styles.Frame}"><path class="${styles.Pattern}"></path></svg>
      <ark-qr-code-pattern></ark-qr-code-pattern>
    </ark-qr-code-frame>
  </ark-qr-code>`
}
