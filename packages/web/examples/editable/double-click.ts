import '../../src/components/editable/index.js'

import styles from 'styles/editable.module.css'

const editable = (attrs: string, control = '') => /* html */ `
  <ark-editable class="${styles.Root}" ${attrs}>
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
    ${control ? /* html */ `<ark-editable-control class="${styles.Control}">${control}</ark-editable-control>` : ''}
  </ark-editable>`

export function mount(root: HTMLElement) {
  root.innerHTML = editable(`default-value="Double-click to edit" activation-mode="dblclick"`)
}
