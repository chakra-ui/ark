import { createElement, Sparkles, X } from 'lucide'

import '@ark-ui/web/tour'
import type { TourStepDetails } from '@ark-ui/web/tour'

import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const icon = (node: typeof X) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const steps: TourStepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Async Data Loading',
    description: 'This tour demonstrates loading data before showing a step.',
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'user-info',
    type: 'tooltip',
    title: 'Loading...',
    description: 'Fetching user data...',
    target: () => document.querySelector<HTMLElement>('#user-card'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
    effect({ show, update }) {
      const controller = new AbortController()
      fetch('https://api.github.com/users/segunadebayo', { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          update({
            title: `Welcome, ${data.name || data.login}!`,
            description: `You have ${data.public_repos} public repositories and ${data.followers} followers.`,
          })
          show()
        })
        .catch(() => {
          update({ title: 'User Profile', description: 'Could not load user data. Please try again.' })
          show()
        })
      return () => controller.abort()
    },
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Tour Complete',
    description: 'The async step loaded data from the GitHub API before displaying.',
    actions: [{ label: 'Done', action: 'dismiss' }],
  },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Root}">
    <button type="button" data-variant="surface" class="${button.Root}" data-start>${icon(Sparkles)} Start Tour</button>
    <div id="user-card" class="${styles.Target}">User Profile Card</div>
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
