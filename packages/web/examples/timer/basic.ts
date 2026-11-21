import { createElement, Pause, Play } from 'lucide'

import '../../src/components/timer/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

interface Segment {
  type: string
  label: string
}

interface Action {
  action: string
  icon: typeof Play
  label: string
}

const segments: Segment[] = ['days', 'hours', 'minutes', 'seconds'].map((type) => ({ type, label: type }))

const actions: Action[] = [
  { action: 'start', icon: Play, label: 'Play' },
  { action: 'resume', icon: Play, label: 'Resume' },
  { action: 'pause', icon: Pause, label: 'Pause' },
]

const icon = (node: typeof Play) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const timerItem = ({ type, label }: Segment) => /* html */ `
  <div class="${styles.ItemGroup}">
    <ark-timer-item class="${styles.Item}" type="${type}"></ark-timer-item>
    <span class="${styles.ItemLabel}">${label}</span>
  </div>`

const actionTrigger = ({ action, icon: node, label }: Action) => /* html */ `
  <ark-timer-action-trigger action="${action}">
    <button class="${button.Root}">${icon(node)} ${label}</button>
  </ark-timer-action-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-timer class="stack" target-ms="${60 * 60 * 1000}" start-ms="${40 * 60 * 1000}">
    <ark-timer-area class="${styles.Area}">
      ${segments.map(timerItem).join(/* html */ `<ark-timer-separator class="${styles.Separator}">:</ark-timer-separator>`)}
    </ark-timer-area>
    <ark-timer-control class="hstack">
      ${actions.map(actionTrigger).join('')}
    </ark-timer-control>
  </ark-timer>`
}
