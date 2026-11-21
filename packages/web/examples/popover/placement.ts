import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const attr = (name: string, value?: string | number | boolean) => (value === undefined ? '' : `${name}="${value}"`)

interface PopoverProps {
  placement?: string
  gutter?: number
}

const popover = ({ placement, gutter }: PopoverProps, children: string[]) => /* html */ `
  <ark-popover ${attr('placement', placement)} ${attr('gutter', gutter)}>
    <ark-popover-trigger><button class="${button.Root}">Click Me</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${children.join('')}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

const heading = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = popover({ placement: 'right', gutter: 12 }, [
    heading({ title: 'On the right', description: 'Placed with the placement and gutter attributes.' }),
  ])
}
