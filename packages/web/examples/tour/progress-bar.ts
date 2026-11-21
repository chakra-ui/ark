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
    title: 'Progress Tracking',
    description: 'Watch the progress bar at the bottom as you navigate.',
    target: () => document.querySelector<HTMLElement>('#progress-1'),
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Halfway There',
    description: 'The progress bar shows how far along you are.',
    target: () => document.querySelector<HTMLElement>('#progress-2'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Almost Done',
    description: 'One more step to complete the tour.',
    target: () => document.querySelector<HTMLElement>('#progress-3'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-4',
    type: 'tooltip',
    title: 'Complete!',
    description: 'You have completed all the steps.',
    target: () => document.querySelector<HTMLElement>('#progress-4'),
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
      <div id="progress-1" class="${styles.Target}">Step 1</div>
      <div id="progress-2" class="${styles.Target}">Step 2</div>
      <div id="progress-3" class="${styles.Target}">Step 3</div>
      <div id="progress-4" class="${styles.Target}">Step 4</div>
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
        <div class="${styles.ProgressBarBottom}"><div class="${styles.ProgressFill}"></div></div>
      </ark-tour-content>
    </ark-tour-positioner>
  </ark-tour>
  </div>`

  const tour = root.querySelector('ark-tour')!
  tour.steps = steps
  root.querySelector('[data-start]')!.addEventListener('click', () => tour.api?.start())
  const fill = root.querySelector<HTMLElement>(`.${styles.ProgressFill}`)!
  tour.addEventListener('stepchange', (event) => {
    fill.style.width = `${((event.detail.stepIndex + 1) / event.detail.totalSteps) * 100}%`
  })
}
