import '@ark-ui/web/download-trigger'

import { createElement, Download, Image } from 'lucide'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="${styles.Root}">
      <div class="${styles.Preview}">
        ${createElement(Image).outerHTML}
        <span class="${styles.PreviewText}">random-image.jpg (fetched on download)</span>
      </div>
      <ark-download-trigger file-name="random-image.jpg" mime-type="image/jpeg">
        <button class="${button.Root}">${createElement(Download).outerHTML} Download image</button>
      </ark-download-trigger>
    </div>`

  const trigger = root.querySelector('ark-download-trigger')

  if (trigger) {
    trigger.data = async () => {
      const response = await fetch('https://picsum.photos/200/300')
      return response.blob()
    }
  }
}
