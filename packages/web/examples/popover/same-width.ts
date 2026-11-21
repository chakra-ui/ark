import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const popoverMarkup = (attrs: string, body: string) => `
  <ark-popover ${attrs}>
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${body}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

const closeButton = `<ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>`

const heading = (title: string, description: string) => `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = popoverMarkup(
    'same-width',
    `${closeButton}${heading('Matched Width', 'This popover matches the width of its trigger element.')}`,
  ).replace(`<button class="${button.Root}">`, `<button class="${button.Root}" style="min-width: 200px">`)
}
