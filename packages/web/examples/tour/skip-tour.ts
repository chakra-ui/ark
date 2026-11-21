import { createElement, Sparkles, X } from 'lucide'

import '@ark-ui/web/tour'
import type { TourStepDetails } from '@ark-ui/web/tour'

import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const icon = (node: typeof X) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const steps: TourStepDetails[] = [
  {
    id: 'step-1',
    type: 'tooltip',
    title: 'First Feature',
    description: 'You can skip this tour at any time using the Skip button.',
    target: () => document.querySelector<HTMLElement>('#item-1'),
    actions: [
      { label: 'Skip', action: 'dismiss' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Second Feature',
    description: 'Continue or skip to end the tour early.',
    target: () => document.querySelector<HTMLElement>('#item-2'),
    actions: [
      { label: 'Skip', action: 'dismiss' },
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Final Feature',
    description: 'This is the last step of the tour.',
    target: () => document.querySelector<HTMLElement>('#item-3'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Finish', action: 'dismiss' },
    ],
  },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Root}">
    <button type="button" data-variant="surface" class="${button.Root}" data-start>${icon(Sparkles)} Start Tour</button>
    <div class="${styles.ActionButtons}">
      <div id="item-1" class="${styles.Target}">Item 1</div>
      <div id="item-2" class="${styles.Target}">Item 2</div>
      <div id="item-3" class="${styles.Target}">Item 3</div>
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
