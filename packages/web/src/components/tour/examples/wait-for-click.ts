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
    title: 'Interactive Tutorial',
    description: 'This tour will guide you through actions. You must complete each step to proceed.',
    actions: [{ label: 'Begin', action: 'next' }],
  },
  {
    id: 'click-add',
    type: 'tooltip',
    title: 'Click the Add Button',
    description: 'Click the "Add Item" button to continue.',
    target: () => document.querySelector<HTMLElement>('#btn-add'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'click-edit',
    type: 'tooltip',
    title: 'Click the Edit Button',
    description: 'Now click the "Edit" button.',
    target: () => document.querySelector<HTMLElement>('#btn-edit'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'click-delete',
    type: 'tooltip',
    title: 'Click the Delete Button',
    description: 'Finally, click the "Delete" button.',
    target: () => document.querySelector<HTMLElement>('#btn-delete'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Well Done!',
    description: 'You completed all the interactive steps.',
    actions: [{ label: 'Finish', action: 'dismiss' }],
  },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Root}">
    <button type="button" data-variant="surface" class="${button.Root}" data-start>${icon(Sparkles)} Start Interactive Tour</button>
    <div class="${styles.ActionButtons}">
      <button id="btn-add" type="button" class="${button.Root}">Add Item</button>
      <button id="btn-edit" type="button" class="${button.Root}">Edit</button>
      <button id="btn-delete" type="button" class="${button.Root}">Delete</button>
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
