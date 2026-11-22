import '@ark-ui/web/qr-code'

import button from 'styles/button.module.css'
import styles from 'styles/qr-code.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-qr-code class="${styles.Root}" default-value="http://ark-ui.com">
    <ark-qr-code-frame>
      <svg class="${styles.Frame}"><path class="${styles.Pattern}"></path></svg>
      <ark-qr-code-pattern></ark-qr-code-pattern>
    </ark-qr-code-frame>
    <ark-qr-code-download-trigger file-name="qr-code.png" mime-type="image/png">
      <button class="${button.Root}">Download</button>
    </ark-qr-code-download-trigger>
  </ark-qr-code>`
}
