import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

const attr = (name: string, value?: string | boolean) =>
  value === undefined || value === false ? '' : value === true ? name : `${name}="${value}"`

interface PopoverProps {
  trigger?: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  unmountOnExit?: boolean
  lazy?: boolean
}

const popover = (
  { trigger = 'Click Me', placement, unmountOnExit, lazy = false }: PopoverProps,
  children: string[],
) => /* html */ `
  <ark-popover ${attr('placement', placement)} ${attr('unmount-on-exit', unmountOnExit)}>
    <ark-popover-trigger><button class="${button.Root}">${trigger}</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">${lazy ? /* html */ `<template>${children.join('')}</template>` : children.join('')}</ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`

const heading = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-popover-title class="${styles.Title}">${title}</ark-popover-title>
  <ark-popover-description class="${styles.Description}">${description}</ark-popover-description>`

export function mount(root: HTMLElement) {
  root.innerHTML = popover({}, [
    heading({ title: 'Settings', description: 'Manage your preferences and account settings.' }),
    popover({ trigger: 'Advanced', placement: 'right', unmountOnExit: true, lazy: true }, [
      heading({ title: 'Advanced Settings', description: 'Configure advanced options for power users.' }),
    ]),
  ])
}
