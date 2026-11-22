import { createElement, Sparkles, X } from 'lucide'

import '@ark-ui/web/tour'
import type { TourStepDetails } from '@ark-ui/web/tour'

import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const icon = (node: typeof X) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const steps: TourStepDetails[] = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome to the App!',
    description: "Let's take a quick tour to get you started with the main features.",
    actions: [{ label: 'Start Tour', action: 'next' }],
  },
  {
    id: 'upload',
    type: 'tooltip',
    title: 'Upload Files',
    description: 'Click here to upload your files to the cloud.',
    target: () => document.querySelector<HTMLElement>('#btn-upload'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'save',
    type: 'tooltip',
    title: 'Save Changes',
    description: 'Save your work to keep your progress.',
    target: () => document.querySelector<HTMLElement>('#btn-save'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'more',
    type: 'tooltip',
    title: 'More Options',
    description: 'Access additional settings and actions from this menu.',
    target: () => document.querySelector<HTMLElement>('#btn-more'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'complete',
    type: 'dialog',
    title: "You're all set!",
    description: 'You now know the basics. Enjoy using the app!',
    actions: [{ label: 'Finish', action: 'dismiss' }],
  },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Root}">
    <button type="button" data-variant="surface" class="${button.Root}" data-start>${icon(Sparkles)} Start Tour</button>
    <div class="${styles.ActionButtons}">
      <button id="btn-upload" class="${button.Root}">Upload</button>
      <button id="btn-save" class="${button.Root}">Save</button>
      <button id="btn-more" class="${button.Root}">More</button>
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
