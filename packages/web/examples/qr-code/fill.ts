import '../../src/components/qr-code/index.js'

import styles from 'styles/qr-code.module.css'

const fills = ['#5417D7', '#EC5D5E']

const qrCode = ({ fill }: { fill: string }) => /* html */ `
  <ark-qr-code class="${styles.Root}" default-value="http://ark-ui.com">
    <ark-qr-code-frame>
      <svg class="${styles.Frame}" style="fill: ${fill}"><path class="${styles.Pattern}"></path></svg>
      <ark-qr-code-pattern></ark-qr-code-pattern>
    </ark-qr-code-frame>
  </ark-qr-code>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="hstack">
    ${fills.map((fill) => qrCode({ fill })).join('')}
  </div>`
}
