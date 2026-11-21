import { createElement, ChevronDown } from 'lucide'

import '../../src/components/accordion/index.js'

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

const indicator = /* html */ `
  <ark-accordion-item-indicator class="${styles.ItemIndicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-accordion-item-indicator>`

const attr = (name: string, on?: boolean) => (on ? name : '')

const accordion = (
  { defaultValue, multiple }: { defaultValue: string; multiple?: boolean },
  children: string[],
) => /* html */ `
  <ark-accordion class="${styles.Root}" default-value="${defaultValue}" ${attr('multiple', multiple)}>
    ${children.join('')}
  </ark-accordion>`

const accordionItem = ({ value, title, content }: Item) => /* html */ `
  <ark-accordion-item class="${styles.Item}" value="${value}">
    <ark-accordion-item-header class="${styles.ItemHeader}">
      <ark-accordion-item-trigger>
        <button class="${styles.ItemTrigger}">
          ${title}
          ${indicator}
        </button>
      </ark-accordion-item-trigger>
    </ark-accordion-item-header>
    <ark-accordion-item-content class="${styles.ItemContent}"><div class="${styles.ItemBody}">${content}</div></ark-accordion-item-content>
  </ark-accordion-item>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = /* html */ `
    <output class="${styles.Output}">value: ark-ui</output>
    ${accordion({ defaultValue: 'ark-ui', multiple: true }, items.map(accordionItem))}`
  host.querySelector('ark-accordion')!.addEventListener('valuechange', (event) => {
    host.querySelector('output')!.textContent = `value: ${event.detail.value.join(', ')}`
  })
  root.replaceChildren(host)
}
