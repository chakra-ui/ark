import '../../src/components/menu/index.js'
import '../../src/components/menubar/index.js'

import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) =>
  /* html */ `<ark-menu-item class="${menu.Item}" value="${value}">${label}</ark-menu-item>`

const separator = /* html */ `<ark-menu-separator class="${menu.Separator}"></ark-menu-separator>`

const menuMarkup = ({ label, disabled }: { label: string; disabled?: boolean }, items: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger><button class="${styles.Trigger}" ${disabled ? 'disabled' : ''}>${label}</button></ark-menu-trigger>
    <ark-menu-positioner class="${menu.Positioner}">
      <ark-menu-content class="${menu.Content}">
        <ark-menu-list class="${menu.List}">${items.join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const clipboardItems: Item[] = [
  { value: 'cut', label: 'Cut' },
  { value: 'copy', label: 'Copy' },
  { value: 'paste', label: 'Paste' },
]

const viewItems: Item[] = [
  { value: 'zoom-in', label: 'Zoom In' },
  { value: 'zoom-out', label: 'Zoom Out' },
  { value: 'fullscreen', label: 'Toggle Fullscreen' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menubar class="${styles.Root}">
    ${menuMarkup({ label: 'File' }, [
      item({ value: 'new', label: 'New File' }),
      item({ value: 'open', label: 'Open...' }),
      separator,
      item({ value: 'save', label: 'Save' }),
      item({ value: 'save-as', label: 'Save As...' }),
    ])}
    ${menuMarkup({ label: 'Edit' }, [
      item({ value: 'undo', label: 'Undo' }),
      item({ value: 'redo', label: 'Redo' }),
      separator,
      ...clipboardItems.map((entry) => item(entry)),
    ])}
    ${menuMarkup({ label: 'Develop', disabled: true }, [item({ value: 'inspect', label: 'Inspect Element' })])}
    ${menuMarkup(
      { label: 'View' },
      viewItems.map((entry) => item(entry)),
    )}
  </ark-menubar>`
}
