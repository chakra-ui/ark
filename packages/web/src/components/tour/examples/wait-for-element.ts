import { createElement, Plus, Sparkles, X } from 'lucide'

import { waitForElement, waitForEvent } from '@ark-ui/web/tour'
import type { TourStepDetails } from '@ark-ui/web/tour'

import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const icon = (node: typeof X) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const steps: TourStepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Dynamic Elements',
    description: 'This tour demonstrates waiting for elements that appear dynamically.',
    actions: [{ label: 'Start', action: 'next' }],
  },
  {
    id: 'add-item',
    type: 'tooltip',
    title: 'Add an Item',
    description: 'Click the button to add a new item to the list.',
    target: () => document.querySelector<HTMLElement>('#btn-add-item'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'new-item',
    type: 'tooltip',
    title: 'New Item Added!',
    description: 'The tour waited for this element to appear before showing this step.',
    target: () => document.querySelector<HTMLElement>('[data-item="new"]'),
    effect({ show }) {
      const [promise, cancel] = waitForElement(() => document.querySelector<HTMLElement>('[data-item="new"]'), {
        timeout: 5000,
      })
      promise.then(() => show())
      return () => cancel()
    },
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Tour Complete',
    description: 'You learned how to use waitForElement for dynamic content.',
    actions: [{ label: 'Done', action: 'dismiss' }],
  },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Root}">
    <button type="button" data-variant="surface" class="${button.Root}" data-start>${icon(Sparkles)} Start Tour</button>
    <button id="btn-add-item" type="button" class="${button.Root}">${icon(Plus)} Add Item</button>
    <div class="${styles.List}">
      <div class="${styles.ListItem}">Item 1</div>
      <div class="${styles.ListItem}">Item 2</div>
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

  const list = root.querySelector<HTMLElement>(`.${styles.List}`)!
  root.querySelector('#btn-add-item')!.addEventListener('click', () => {
    list.querySelector('[data-item="new"]')?.removeAttribute('data-item')
    const item = document.createElement('div')
    item.className = styles.ListItem
    item.dataset.item = 'new'
    item.textContent = `Item ${list.children.length + 1}`
    list.append(item)
  })
}
