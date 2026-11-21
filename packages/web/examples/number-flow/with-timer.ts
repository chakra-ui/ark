import { createElement, Pause, Play, RotateCcw } from 'lucide'

import '@ark-ui/web/number-flow'
import '@ark-ui/web/timer'

import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'
import timerStyles from 'styles/timer.module.css'

const icon = (node: typeof Play) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const flow = (unit: string) => /* html */ `
  <ark-number-flow class="${styles.Root}" data-unit="${unit}" trend="-1">
    <ark-number-flow-segments></ark-number-flow-segments>
  </ark-number-flow>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-timer class="${styles.Card}" countdown start-ms="${5 * 60 * 1000}">
    <span class="${styles.Label}">Offer ends in</span>
    <ark-timer-area class="${timerStyles.Area} ${styles.Display}">
      ${flow('minutes')}
      <ark-timer-separator class="${timerStyles.Separator}">:</ark-timer-separator>
      ${flow('seconds')}
    </ark-timer-area>
    <ark-timer-control class="${styles.Actions}">
      <ark-timer-action-trigger action="start">
        <button class="${button.Root}" data-variant="solid">${icon(Play)} Start</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="pause">
        <button class="${button.Root}">${icon(Pause)} Pause</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="resume">
        <button class="${button.Root}">${icon(Play)} Resume</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="reset">
        <button class="${button.Root}">${icon(RotateCcw)} Reset</button>
      </ark-timer-action-trigger>
    </ark-timer-control>
  </ark-timer>`

  const timer = root.querySelector('ark-timer')!
  const flows = root.querySelectorAll('ark-number-flow')

  for (const el of flows) el.formatOptions = { minimumIntegerDigits: 2 }

  const sync = () => {
    const time = timer.api?.time
    if (!time) return
    for (const el of flows) el.value = time[el.dataset.unit as 'minutes' | 'seconds']
  }

  timer.addEventListener('tick', sync)
  root.querySelector('ark-timer-control')!.addEventListener('click', () => queueMicrotask(sync))
  timer.ready.then(sync)
}
