import { createElement, Check, Minus } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.style.cssText = 'width: 100%; max-width: 16rem'
  host.innerHTML = html
  return host
}

interface Item {
  value: string
  label: string
}

const item = ({ value, label }: Item) => /* html */ `
  <ark-listbox-item class="${styles.Item}" value="${value}">
    <ark-listbox-item-text class="${styles.ItemText}">${label}</ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

export function mount(root: HTMLElement) {
  const all: Item[] = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Nuxt.js', value: 'nuxtjs' },
    { label: 'Remix', value: 'remix' },
    { label: 'Gatsby', value: 'gatsby' },
  ]
  const host = fragment(/* html */ `
    <ark-listbox class="${styles.Root}" selection-mode="multiple">
      <ark-listbox-label class="${styles.Label}">Frameworks</ark-listbox-label>
      <button class="${styles.SelectAllHeader}" type="button">
        <span class="${styles.SelectAllHeaderIndicator}"></span>
        <span class="${styles.Label}">Select All</span>
      </button>
      <ark-listbox-content class="${styles.Content}">
        <ark-listbox-list class="${styles.List}">${all.map((entry) => item(entry)).join('')}</ark-listbox-list>
      </ark-listbox-content>
    </ark-listbox>`)
  const el = host.querySelector('ark-listbox')!
  const indicator = host.querySelector(`.${styles.SelectAllHeaderIndicator}`)!
  const allSelected = () => (el.api?.value.length ?? 0) === all.length
  host.querySelector('button')!.addEventListener('click', () => {
    el.api?.setValue(allSelected() ? [] : all.map((it) => it.value))
  })
  el.addEventListener('valuechange', (event) => {
    const count = event.detail.value.length
    indicator.innerHTML =
      count === all.length
        ? createElement(Check, { 'aria-hidden': 'true' }).outerHTML
        : count > 0
          ? createElement(Minus, { 'aria-hidden': 'true' }).outerHTML
          : ''
  })
  root.replaceChildren(host)
}
