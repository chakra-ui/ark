import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

interface PopoverProps {
  closeOnEscape?: boolean
  closeOnInteractOutside?: boolean
}

const popover = ({ closeOnEscape, closeOnInteractOutside }: PopoverProps, children: string[]) => /* html */ `
  <ark-popover ${attr('close-on-escape', closeOnEscape)} ${attr('close-on-interact-outside', closeOnInteractOutside)}>
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${children.join('')}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

const closeButton = /* html */ `<ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>`

const heading = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = popover({ closeOnEscape: true, closeOnInteractOutside: true }, [
    closeButton,
    heading({ title: 'Quick Actions', description: 'Press Escape or click outside to close this popover.' }),
  ])
}
