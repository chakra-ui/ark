import { createElement, ChevronDown } from 'lucide'

import '../../src/components/accordion/index.js'

import styles from 'styles/accordion.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-accordion class="${styles.Root}" default-value="ark-ui">
    
      <ark-accordion-item class="${styles.Item}" value="ark-ui" >
        <ark-accordion-item-header class="${styles.ItemHeader}">
          <ark-accordion-item-trigger>
            <button class="${styles.ItemTrigger}">
              What is Ark UI?
              <ark-accordion-item-indicator class="${styles.ItemIndicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-accordion-item-indicator>
            </button>
          </ark-accordion-item-trigger>
        </ark-accordion-item-header>
        <ark-accordion-item-content class="${styles.ItemContent}"><div class="${styles.ItemBody}">A headless component library for building accessible web apps.</div></ark-accordion-item-content>
      </ark-accordion-item>
      <ark-accordion-item class="${styles.Item}" value="getting-started" >
        <ark-accordion-item-header class="${styles.ItemHeader}">
          <ark-accordion-item-trigger>
            <button class="${styles.ItemTrigger}">
              How to get started?
              <ark-accordion-item-indicator class="${styles.ItemIndicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-accordion-item-indicator>
            </button>
          </ark-accordion-item-trigger>
        </ark-accordion-item-header>
        <ark-accordion-item-content class="${styles.ItemContent}"><div class="${styles.ItemBody}">Install the package and import the components you need.</div></ark-accordion-item-content>
      </ark-accordion-item>
      <ark-accordion-item class="${styles.Item}" value="maintainers" >
        <ark-accordion-item-header class="${styles.ItemHeader}">
          <ark-accordion-item-trigger>
            <button class="${styles.ItemTrigger}">
              Who maintains this project?
              <ark-accordion-item-indicator class="${styles.ItemIndicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-accordion-item-indicator>
            </button>
          </ark-accordion-item-trigger>
        </ark-accordion-item-header>
        <ark-accordion-item-content class="${styles.ItemContent}"><div class="${styles.ItemBody}">Ark UI is maintained by the Chakra UI team.</div></ark-accordion-item-content>
      </ark-accordion-item>
  </ark-accordion>`
}
