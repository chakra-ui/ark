import '../../src/components/editable/index.js'

import styles from 'styles/editable.module.css'

interface EditableProps {
  defaultValue?: string
  activationMode?: 'focus' | 'dblclick' | 'click' | 'none'
}

const editable = ({ defaultValue, activationMode }: EditableProps) => /* html */ `
  <ark-editable
    class="${styles.Root}"
    ${defaultValue !== undefined ? `default-value="${defaultValue}"` : ''}
    ${activationMode !== undefined ? `activation-mode="${activationMode}"` : ''}
  >
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
  </ark-editable>`

export function mount(root: HTMLElement) {
  root.innerHTML = editable({ defaultValue: 'Double-click to edit', activationMode: 'dblclick' })
}
