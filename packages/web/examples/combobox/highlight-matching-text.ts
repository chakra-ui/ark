import { createElement, X, ChevronsUpDown } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.style.cssText = 'width: 100%; max-width: 16rem'
  host.innerHTML = html
  return host
}

const combobox = (
  label: string,
  placeholder: string,
  list: string,
  { attrs = '', data = '', clear = true, empty = false } = {},
) => `
  <ark-combobox class="${styles.Root}" ${attrs}>
    ${data}
    <ark-combobox-label class="${styles.Label}">${label}</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="${placeholder}" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        ${clear ? `<ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>` : ''}
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        ${empty ? `<ark-combobox-empty><div class="${styles.Empty}">No results found</div></ark-combobox-empty>` : ''}
        <ark-combobox-list class="${styles.List}">${list}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

const highlight = (text: string, query: string) => {
  if (!query) return escapeHtml(text)
  const pattern = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text
    .split(pattern)
    .map((part, i) => (i % 2 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
    .join('')
}

export function mount(root: HTMLElement) {
  const people = ['John Smith', 'Jane Doe', 'Bob Johnson', 'Alice Williams', 'Charlie Brown', 'Diana Ross']
  const host = fragment(
    combobox(
      'Assignee',
      'e.g. John Smith',
      people
        .map(
          (label) => `
          <ark-combobox-item class="${styles.Item}" value="${label.toLowerCase().replace(' ', '-')}">
            <ark-combobox-item-text class="${styles.ItemText}">${label}</ark-combobox-item-text>
          </ark-combobox-item>`,
        )
        .join(''),
    ),
  )
  host.querySelector('ark-combobox')!.addEventListener('inputvaluechange', (event) => {
    const { inputValue } = event.detail
    for (const text of host.querySelectorAll('ark-combobox-item-text')) {
      text.innerHTML = highlight(text.textContent ?? '', inputValue)
    }
  })
  root.replaceChildren(host)
}
