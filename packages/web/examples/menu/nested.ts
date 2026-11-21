import { createElement, ChevronDown } from 'lucide'

import '@ark-ui/web/menu'

import styles from 'styles/menu.module.css'

interface Item {
  value: string
  label: string
}

const submenu = ({ label }: { label: string }, items: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger-item class="${styles.TriggerItem}">${label}</ark-menu-trigger-item>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}"><ark-menu-list class="${styles.List}">${items.join('')}</ark-menu-list></ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const item = ({ value, label }: Item) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

const separator = () => /* html */ `<ark-menu-separator class="${styles.Separator}"></ark-menu-separator>`

const exportItems: Item[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'png', label: 'PNG' },
  { value: 'svg', label: 'SVG' },
]

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = /* html */ `
  <output>Selected: none</output>
  <ark-menu>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        File
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <ark-menu-list class="${styles.List}">
          ${item({ value: 'new', label: 'New File' })}
          ${item({ value: 'open', label: 'Open...' })}
          ${separator()}
          ${submenu({ label: 'Share' }, [
            item({ value: 'email', label: 'Email' }),
            item({ value: 'message', label: 'Message' }),
            submenu({ label: 'More' }, [
              item({ value: 'airdrop', label: 'AirDrop' }),
              item({ value: 'nearby', label: 'Nearby Share' }),
            ]),
          ])}
          ${submenu({ label: 'Export' }, exportItems.map(item))}
          ${separator()}
          ${item({ value: 'print', label: 'Print...' })}
        </ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
  host.querySelector('ark-menu')!.addEventListener(
    'itemselect',
    (event) => {
      const { value } = event.detail ?? {}
      if (value) host.querySelector('output')!.textContent = `Selected: ${value}`
    },
    { capture: true },
  )
  root.replaceChildren(host)
}
