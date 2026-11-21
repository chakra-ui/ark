import '@ark-ui/web/editable'

import styles from 'styles/editable.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-editable
    class="${styles.Root}"
    placeholder="Enter a description..."
    default-value="Ark UI is a headless component library for building reusable, scalable design systems."
    activation-mode="dblclick"
  >
    <ark-editable-label class="${styles.Label}">Description</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><textarea class="${styles.Textarea}"></textarea></ark-editable-input>
      <ark-editable-preview><span class="${styles.Textarea}"></span></ark-editable-preview>
    </ark-editable-area>
    <div class="${styles.HelperText}">Press Cmd + Enter to save</div>
  </ark-editable>`
}
