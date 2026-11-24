import { createElement, Sparkles, X } from 'lucide'

import { waitForEvent } from '@ark-ui/web/tour'
import type { TourStepDetails } from '@ark-ui/web/tour'

import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const icon = (node: typeof X) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const steps: TourStepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Form Tutorial',
    description: 'Learn how to fill out the form by following the guided steps.',
    actions: [{ label: 'Start', action: 'next' }],
  },
  {
    id: 'enter-name',
    type: 'tooltip',
    title: 'Enter Your Name',
    description: 'Type your name in the input field to continue.',
    target: () => document.querySelector<HTMLInputElement>('#input-name'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
        predicate: (el) => el.value.trim().length >= 2,
      })
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'enter-email',
    type: 'tooltip',
    title: 'Enter Your Email',
    description: 'Now enter a valid email address.',
    target: () => document.querySelector<HTMLInputElement>('#input-email'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
        predicate: (el) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value),
      })
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'check-terms',
    type: 'tooltip',
    title: 'Accept Terms',
    description: 'Check the checkbox to accept the terms.',
    target: () => document.querySelector<HTMLInputElement>('#checkbox-terms'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'change', {
        predicate: (el) => el.checked,
      })
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Form Complete!',
    description: 'You have successfully filled out the form.',
    actions: [{ label: 'Done', action: 'dismiss' }],
  },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Root}">
    <button type="button" data-variant="surface" class="${button.Root}" data-start>${icon(Sparkles)} Start Form Tutorial</button>
    <div class="${styles.Form}">
      <div class="${styles.FormField}">
        <label for="input-name">Name</label>
        <input id="input-name" type="text" placeholder="Enter your name" class="${styles.Input}" />
      </div>
      <div class="${styles.FormField}">
        <label for="input-email">Email</label>
        <input id="input-email" type="email" placeholder="Enter your email" class="${styles.Input}" />
      </div>
      <div class="${styles.FormFieldInline}">
        <input id="checkbox-terms" type="checkbox" class="${styles.Checkbox}" />
        <label for="checkbox-terms">I accept the terms and conditions</label>
      </div>
    </div>
  <ark-tour>
    <ark-tour-backdrop class="${styles.Backdrop}"></ark-tour-backdrop>
    <ark-tour-spotlight class="${styles.Spotlight}"></ark-tour-spotlight>
    <ark-tour-positioner class="${styles.Positioner}">
      <ark-tour-content class="${styles.Content}">
        <ark-tour-arrow class="${styles.Arrow}"><ark-tour-arrow-tip class="${styles.ArrowTip}"></ark-tour-arrow-tip></ark-tour-arrow>
        <ark-tour-close-trigger><button class="${styles.CloseTrigger}">${icon(X)}</button></ark-tour-close-trigger>
        <ark-tour-progress-text class="${styles.ProgressText}"></ark-tour-progress-text>
        <ark-tour-title class="${styles.Title}"></ark-tour-title>
        <ark-tour-description class="${styles.Description}"></ark-tour-description>
        <ark-tour-control class="${styles.Control}">
          <ark-tour-actions><template><button class="${styles.ActionTrigger}"></button></template></ark-tour-actions>
        </ark-tour-control>
      </ark-tour-content>
    </ark-tour-positioner>
  </ark-tour>
  </div>`

  const tour = root.querySelector('ark-tour')!
  tour.steps = steps
  root.querySelector('[data-start]')!.addEventListener('click', () => tour.api?.start())
}
