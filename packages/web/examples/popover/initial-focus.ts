import { createElement, X } from 'lucide'

import '../../src/components/popover/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/popover.module.css'

import field from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-popover initial-focus="#popover-first-name">
    <ark-popover-trigger><button class="${button.Root}">Update Profile</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">
        <ark-popover-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-popover-close-trigger>
        <ark-popover-title class="${styles.Title}">Enter your name</ark-popover-title>
        <ark-popover-description class="${styles.Description}">Make changes to your profile here.</ark-popover-description>
        <div class="${styles.Body}">
          <input id="popover-first-name" class="${field.Input}" placeholder="First Name" value="John" />
          <input class="${field.Input}" placeholder="Last Name" />
          <textarea class="${field.Textarea}" placeholder="Add details"></textarea>
          <button class="${button.Root}" data-variant="solid">Save</button>
        </div>
      </ark-popover-content>
    </ark-popover-positioner>
  </ark-popover>`
}
