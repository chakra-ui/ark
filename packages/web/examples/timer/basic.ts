import { createElement, Pause, Play } from 'lucide'

import '../../src/components/timer/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

const icon = (node: typeof Play) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = (type: string, label: string) => /* html */ `
  <div class="${styles.ItemGroup}">
    <ark-timer-item class="${styles.Item}" type="${type}"></ark-timer-item>
    <span class="${styles.ItemLabel}">${label}</span>
  </div>`

const separator = /* html */ `<ark-timer-separator class="${styles.Separator}">:</ark-timer-separator>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-timer class="stack" target-ms="${60 * 60 * 1000}" start-ms="${40 * 60 * 1000}">
    <ark-timer-area class="${styles.Area}">
      ${item('days', 'days')}
      ${separator}
      ${item('hours', 'hours')}
      ${separator}
      ${item('minutes', 'minutes')}
      ${separator}
      ${item('seconds', 'seconds')}
    </ark-timer-area>
    <ark-timer-control class="hstack">
      <ark-timer-action-trigger action="start">
        <button class="${button.Root}">${icon(Play)} Play</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="resume">
        <button class="${button.Root}">${icon(Play)} Resume</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="pause">
        <button class="${button.Root}">${icon(Pause)} Pause</button>
      </ark-timer-action-trigger>
    </ark-timer-control>
  </ark-timer>`
}
