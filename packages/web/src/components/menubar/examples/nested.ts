import '@ark-ui/web/menu'
import '@ark-ui/web/menubar'

import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) =>
  /* html */ `<ark-menu-item class="${menu.Item}" value="${value}">${label}</ark-menu-item>`

const separator = /* html */ `<ark-menu-separator class="${menu.Separator}"></ark-menu-separator>`

const content = (items: string[]) => /* html */ `
  <ark-menu-positioner class="${menu.Positioner}">
    <ark-menu-content class="${menu.Content}">
      <ark-menu-list class="${menu.List}">${items.join('')}</ark-menu-list>
    </ark-menu-content>
  </ark-menu-positioner>`

const menuMarkup = ({ label }: { label: string }, items: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger><button class="${styles.Trigger}">${label}</button></ark-menu-trigger>
    ${content(items)}
  </ark-menu>`

const submenu = ({ label }: { label: string }, items: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger-item class="${menu.TriggerItem}">${label}</ark-menu-trigger-item>
    ${content(items)}
  </ark-menu>`

const exportItems: Item[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'png', label: 'PNG' },
  { value: 'svg', label: 'SVG' },
]

const clipboardItems: Item[] = [
  { value: 'cut', label: 'Cut' },
  { value: 'copy', label: 'Copy' },
  { value: 'paste', label: 'Paste' },
]

const findItems: Item[] = [
  { value: 'find', label: 'Find...' },
  { value: 'find-next', label: 'Find Next' },
  { value: 'replace', label: 'Replace...' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menubar class="${styles.Root}">
    ${menuMarkup({ label: 'File' }, [
      item({ value: 'new', label: 'New File' }),
      item({ value: 'open', label: 'Open...' }),
      separator,
      submenu(
        { label: 'Export' },
        exportItems.map((entry) => item(entry)),
      ),
      separator,
      item({ value: 'print', label: 'Print...' }),
    ])}
    ${menuMarkup({ label: 'Edit' }, [
      ...clipboardItems.map((entry) => item(entry)),
      separator,
      submenu(
        { label: 'Find' },
        findItems.map((entry) => item(entry)),
      ),
    ])}
    ${menuMarkup({ label: 'View' }, [
      item({ value: 'zoom-in', label: 'Zoom In' }),
      item({ value: 'zoom-out', label: 'Zoom Out' }),
    ])}
  </ark-menubar>`
}
