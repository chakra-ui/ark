import { createElement, X, ChevronsUpDown } from 'lucide'

import '../../src/components/combobox/index.js'
import '../../src/components/highlight/index.js'

import styles from 'styles/combobox.module.css'

const item = ({ value, label }: { value: string; label: string }) => /* html */ `
  <ark-combobox-item class="${styles.Item}" value="${value}">
    <ark-combobox-item-text class="${styles.ItemText}"><ark-highlight>${label}</ark-highlight></ark-combobox-item-text>
  </ark-combobox-item>`

export function mount(root: HTMLElement) {
  const people = ['John Smith', 'Jane Doe', 'Bob Johnson', 'Alice Williams', 'Charlie Brown', 'Diana Ross']
  const host = document.createElement('div')
  host.style.cssText = 'width: 100%; max-width: 16rem'
  host.innerHTML = /* html */ `
    <ark-combobox class="${styles.Root}">
      <ark-combobox-label class="${styles.Label}">Assignee</ark-combobox-label>
      <ark-combobox-control class="${styles.Control}">
        <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. John Smith" /></ark-combobox-input>
        <div class="${styles.Indicators}">
          <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
          <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
        </div>
      </ark-combobox-control>
      <ark-combobox-positioner class="${styles.Positioner}">
        <ark-combobox-content class="${styles.Content}">
          <ark-combobox-list class="${styles.List}">${people.map((label) => item({ value: label.toLowerCase().replace(' ', '-'), label })).join('')}</ark-combobox-list>
        </ark-combobox-content>
      </ark-combobox-positioner>
    </ark-combobox>`
  host.querySelector('ark-combobox')!.addEventListener('inputvaluechange', (event) => {
    for (const highlight of host.querySelectorAll('ark-highlight')) {
      highlight.query = event.detail.inputValue
    }
  })
  root.replaceChildren(host)
}
