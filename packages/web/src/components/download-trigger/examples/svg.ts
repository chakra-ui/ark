import '@ark-ui/web/download-trigger'

import { createElement, Download, File } from 'lucide'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>
</svg>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <div class="${styles.Preview}">
        ${createElement(File).outerHTML}
        <span class="${styles.PreviewText}">circle.svg</span>
      </div>
      <ark-download-trigger file-name="circle.svg" mime-type="image/svg+xml">
        <button class="${button.Root}">${createElement(Download).outerHTML} Download SVG</button>
      </ark-download-trigger>
    </div>`

  const trigger = root.querySelector('ark-download-trigger')
  if (trigger) trigger.data = svg
}
