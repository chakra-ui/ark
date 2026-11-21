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
  <ark-popover initial-focus="#popover-first-name">
    <ark-popover-trigger><button class="${button.Root}">Update Profile</button></ark-popover-trigger>
    <ark-popover-positioner class="${styles.Positioner}">
      <ark-popover-content class="${styles.Content}">
        ${closeButton}
        ${heading('Enter your name', 'Make changes to your profile here.')}
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
