import { createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

const people = [
  'Ada Lovelace',
  'Alan Turing',
  'Grace Hopper',
  'Katherine Johnson',
  'Linus Torvalds',
  'Margaret Hamilton',
]

const search = (query: string) =>
  new Promise<string[]>((resolve) => {
    const q = query.toLowerCase()
    setTimeout(() => resolve(people.filter((name) => name.toLowerCase().includes(q))), 300)
  })

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-command class="${styles.Root}">
    <ark-command-label class="${styles.Label}">People</ark-command-label>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Search people..." aria-label="Search people" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      <template>
        <ark-command-item class="${styles.Item}">
          <ark-command-item-text class="${styles.ItemText}"></ark-command-item-text>
        </ark-command-item>
      </template>
    </ark-command-list>
    <div class="${styles.Loading}" hidden>Loading...</div>
    <ark-command-empty class="${styles.Empty}">No people found</ark-command-empty>
  </ark-command>`

  const command = root.querySelector('ark-command')!
  const loading = root.querySelector<HTMLElement>(`.${styles.Loading}`)!
  let request = 0

  const load = async (query: string) => {
    const id = ++request
    command.toggleAttribute('loading', true)
    loading.hidden = false
    const names = await search(query)
    if (id !== request) return
    command.items = names.map((name) => ({ value: name.toLowerCase().replace(/\s+/g, '-'), label: name }))
    command.toggleAttribute('loading', false)
    loading.hidden = true
  }

  command.filter = () => true
  command.addEventListener('inputvaluechange', (event) => load(event.detail.inputValue))
  load('')
}
