import '@ark-ui/web/download-trigger'

import { createElement, Download, File } from 'lucide'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

const content = 'Hello, World! This is a sample text file.'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <div class="${styles.Preview}">
        ${createElement(File).outerHTML}
        <span class="${styles.PreviewText}">${content}</span>
      </div>
      <ark-download-trigger data="${content}" file-name="hello.txt" mime-type="text/plain">
        <button class="${button.Root}">${createElement(Download).outerHTML} Download txt</button>
      </ark-download-trigger>
    </div>`
}
