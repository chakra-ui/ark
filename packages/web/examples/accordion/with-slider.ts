import { createElement, ChevronDown } from 'lucide'

import '../../src/components/accordion/index.js'

import '../../src/components/slider/index.js'

import styles from 'styles/accordion.module.css'

import sliderStyles from 'styles/slider.module.css'

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

const accordion = ({ defaultValue }: { defaultValue: string }, children: string[]) => /* html */ `
  <ark-accordion class="${styles.Root}" default-value="${defaultValue}">
    ${children.join('')}
  </ark-accordion>`

const accordionItem = ({ value, title, content }: Item, children: string[] = []) => /* html */ `
  <ark-accordion-item class="${styles.Item}" value="${value}">
    <ark-accordion-item-header class="${styles.ItemHeader}">
      <ark-accordion-item-trigger>
        <button class="${styles.ItemTrigger}">
          ${title}
          ${indicator}
        </button>
      </ark-accordion-item-trigger>
    </ark-accordion-item-header>
    <ark-accordion-item-content class="${styles.ItemContent}"><div class="${styles.ItemBody}">${content}${children.join('')}</div></ark-accordion-item-content>
  </ark-accordion-item>`

const slider = ({ label }: { label: string }) => /* html */ `
  <ark-slider class="${sliderStyles.Root}">
    <ark-slider-label class="${sliderStyles.Label}">${label}</ark-slider-label>
    <ark-slider-control class="${sliderStyles.Control}">
      <ark-slider-track class="${sliderStyles.Track}"><ark-slider-range class="${sliderStyles.Range}"></ark-slider-range></ark-slider-track>
      <ark-slider-thumb class="${sliderStyles.Thumb}" index="0"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
    </ark-slider-control>
  </ark-slider>`

export function mount(root: HTMLElement) {
  root.innerHTML = accordion(
    { defaultValue: 'ark-ui' },
    items.map((item) => accordionItem(item, [slider({ label: 'Slider' })])),
  )
}
