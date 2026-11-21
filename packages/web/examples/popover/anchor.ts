import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

import field from 'styles/field.module.css'

const closeButton = `<ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>`

const heading = (title: string, description: string) => `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover>
    <div class="hstack">
      <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
      <ark-popover-anchor class="${styles.Anchor}">
        <input class="${field.Input}" placeholder="Type here..." />
      </ark-popover-anchor>
    </div>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${closeButton}${heading('Title', 'Description')}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
