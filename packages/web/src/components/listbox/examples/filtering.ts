import { createElement, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/listbox'
import { createFilter } from '@ark-ui/web/locale'

import styles from 'styles/listbox.module.css'

import field from 'styles/field.module.css'

const { contains } = createFilter({ sensitivity: 'base' })

export function mount(root: HTMLElement) {
  const all = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Nuxt.js', value: 'nuxtjs' },
    { label: 'Remix', value: 'remix' },
    { label: 'Gatsby', value: 'gatsby' },
    { label: 'Preact', value: 'preact' },
  ]
  root.innerHTML = /* html */ `
    <ark-listbox class="${styles.Root}">
      <ark-listbox-label class="${styles.Label}">Select Framework</ark-listbox-label>
      <ark-listbox-input><input class="${field.Input}" placeholder="Search frameworks..." /></ark-listbox-input>
      <ark-listbox-content class="${styles.Content}">
        <ark-listbox-empty><div class="${styles.Empty}">No frameworks found</div></ark-listbox-empty>
        <ark-listbox-list class="${styles.List}"><template>
  <ark-listbox-item class="${styles.Item}" >
    <ark-listbox-item-text class="${styles.ItemText}"></ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item></template></ark-listbox-list>
      </ark-listbox-content>
    </ark-listbox>`
  const el = root.querySelector('ark-listbox')!
  el.collection = createListCollection({ items: all })
  root.querySelector('input')!.addEventListener('input', (event) => {
    const query = (event.target as HTMLInputElement).value
    el.collection = createListCollection({ items: all.filter((it) => contains(it.label, query)) })
  })
}
