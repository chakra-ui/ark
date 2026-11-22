import { createElement, Check, ChevronDown } from 'lucide'

import { createAsyncList } from '@ark-ui/web/async-list'
import '@ark-ui/web/menu'

import styles from 'styles/menu.module.css'

const people = [
  'Ada Lovelace',
  'Alan Turing',
  'Barbara Liskov',
  'Dennis Ritchie',
  'Grace Hopper',
  'Katherine Johnson',
  'Ken Thompson',
  'Linus Torvalds',
  'Margaret Hamilton',
  'Tim Berners-Lee',
]

const radioItem = (person: string) => /* html */ `
  <ark-menu-radio-item class="${styles.RadioItem}" value="${person}">
    <ark-menu-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-item-indicator>
    <ark-menu-item-text class="${styles.ItemText}">${person}</ark-menu-item-text>
  </ark-menu-radio-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu popup-type="dialog">
    <ark-menu-trigger>
      <button class="${styles.Trigger}"><span>Assign</span><ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator></button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <ark-menu-input><input class="${styles.Input}" aria-label="Search people" placeholder="Search people..." /></ark-menu-input>
        <div class="${styles.Empty}" hidden></div>
        <ark-menu-list class="${styles.List}">
          <ark-menu-radio-item-group class="${styles.ItemGroup}" name="assignee" value=""></ark-menu-radio-item-group>
        </ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

  const menu = root.querySelector('ark-menu')!
  const input = root.querySelector('input')!
  const label = root.querySelector('ark-menu-trigger span')!
  const status = root.querySelector<HTMLElement>(`.${styles.Empty}`)!
  const group = root.querySelector('ark-menu-radio-item-group')!

  const list = createAsyncList<string>({
    initialItems: people,
    async load({ filter, signal }) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      if (signal?.aborted) return { items: [] }
      const query = filter?.toLowerCase() ?? ''
      return { items: people.filter((person) => person.toLowerCase().includes(query)) }
    },
  })

  const update = () => {
    const host = document.createElement('div')
    host.innerHTML = list.items.map(radioItem).join('')
    group.replaceChildren(...host.children)
    status.textContent = list.isLoading ? 'Searching...' : list.items.length === 0 ? 'No people found' : ''
    status.hidden = !status.textContent
  }

  input.addEventListener('input', () => list.setFilter(input.value))
  menu.addEventListener('exitcomplete', () => list.setFilter(''))
  group.addEventListener('valuechange', (event) => {
    label.textContent = (event as CustomEvent<{ value: string }>).detail.value
  })
  list.subscribe(update)
  update()
}
