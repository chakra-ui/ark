import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const json = (items: unknown[]) => /* html */ `<script type="application/json">${JSON.stringify(items)}</script>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-listbox class="${styles.Root}" columns="4">
    ${json(['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎'])}
    <ark-listbox-label class="${styles.Label}">Pick an emoji</ark-listbox-label>
    <ark-listbox-content class="${styles.GridContent}">
      <ark-listbox-list class="${styles.List}">
        <template><ark-listbox-item class="${styles.GridItem}"><ark-listbox-item-text></ark-listbox-item-text></ark-listbox-item></template>
      </ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`
}
