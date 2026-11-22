import { createElement, ChevronDown } from 'lucide'

import '@ark-ui/web/accordion'

import styles from 'styles/accordion.module.css'

interface Item {
  value: string
  title: string
  content: string
}

const items: Item[] = [
  {
    value: 'ark-ui',
    title: 'What is Ark UI?',
    content: 'A headless component library for building accessible web apps.',
  },
  {
    value: 'getting-started',
    title: 'How to get started?',
    content: 'Install the package and import the components you need.',
  },
  {
    value: 'maintainers',
    title: 'Who maintains this project?',
    content: 'Ark UI is maintained by the Chakra UI team.',
  },
]

const item = ({ value, title, content }: Item) => /* html */ `
  <ark-accordion-item class="${styles.Item}" value="${value}">
    <ark-accordion-item-header class="${styles.ItemHeader}">
      <ark-accordion-item-trigger>
        <button class="${styles.ItemTrigger}">
          ${title}
          <ark-accordion-item-indicator class="${styles.ItemIndicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-accordion-item-indicator>
        </button>
      </ark-accordion-item-trigger>
    </ark-accordion-item-header>
    <ark-accordion-item-content class="${styles.ItemContent}"><div class="${styles.ItemBody}">${content}</div></ark-accordion-item-content>
  </ark-accordion-item>`

export function mount(container: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = /* html */ `
    <output class="${styles.Output}">value: </output>
    <ark-accordion class="${styles.Root}" value="">
      ${items.map(item).join('')}
    </ark-accordion>`
  const root = host.querySelector('ark-accordion')!
  root.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    root.setAttribute('value', value.join(','))
    host.querySelector('output')!.textContent = `value: ${value.join(', ')}`
  })
  container.replaceChildren(host)
}
