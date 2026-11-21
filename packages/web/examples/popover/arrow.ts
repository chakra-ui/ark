import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const popover = (children: string[]) => /* html */ `
  <ark-popover>
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${children.join('')}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

const arrow = /* html */ `<ark-popover-arrow class="${styles.Arrow}"><ark-popover-arrow-tip class="${styles.ArrowTip}"></ark-popover-arrow-tip></ark-popover-arrow>`

const closeButton = /* html */ `<ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>`

const heading = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = popover([
    arrow,
    closeButton,
    heading({ title: 'Notifications', description: 'You have 3 unread messages in your inbox.' }),
  ])
}
