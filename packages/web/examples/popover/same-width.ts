import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const attr = (name: string, value?: string | boolean) =>
  value === undefined || value === false ? '' : value === true ? name : `${name}="${value}"`

interface PopoverProps {
  sameWidth?: boolean
  triggerStyle?: string
}

const popover = ({ sameWidth, triggerStyle }: PopoverProps, children: string[]) => /* html */ `
  <ark-popover ${attr('same-width', sameWidth)}>
    <ark-popover-trigger><button class="${button.Root}" ${attr('style', triggerStyle)}>Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${children.join('')}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

const closeButton = /* html */ `<ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>`

const heading = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = popover({ sameWidth: true, triggerStyle: 'min-width: 200px' }, [
    closeButton,
    heading({ title: 'Matched Width', description: 'This popover matches the width of its trigger element.' }),
  ])
}
