import { createElement, Pause, Play, RotateCcw } from 'lucide'

import '../../src/components/timer/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

const WORK_MS = 25 * 60 * 1000
const BREAK_MS = 5 * 60 * 1000

const icon = (node: typeof Play) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = (type: string, label: string) => /* html */ `
  <div class="${styles.ItemGroup}">
    <ark-timer-item class="${styles.Item}" type="${type}"></ark-timer-item>
    <span class="${styles.ItemLabel}">${label}</span>
  </div>`

const sessionTitle = (working: boolean) => (working ? 'Work Session' : 'Break Session')

const sessionMs = (working: boolean) => (working ? WORK_MS : BREAK_MS)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-timer class="stack" countdown start-ms="${WORK_MS}">
    <h2>${sessionTitle(true)}</h2>
    <ark-timer-area class="${styles.Area}">
      ${item('minutes', 'minutes')}
      <ark-timer-separator class="${styles.Separator}">:</ark-timer-separator>
      ${item('seconds', 'seconds')}
    </ark-timer-area>
    <ark-timer-control class="hstack">
      <ark-timer-action-trigger action="start">
        <button class="${button.Root}">${icon(Play)} Start</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="pause">
        <button class="${button.Root}">${icon(Pause)} Pause</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="reset">
        <button class="${button.Root}">${icon(RotateCcw)} Reset</button>
      </ark-timer-action-trigger>
    </ark-timer-control>
    <output>Completed cycles: 0</output>
  </ark-timer>`

  const el = root.querySelector('ark-timer')!
  const title = root.querySelector('h2')!
  const output = root.querySelector('output')!
  let working = true
  let cycles = 0

  el.addEventListener('complete', () => {
    if (!working) output.textContent = `Completed cycles: ${++cycles}`
    working = !working
    title.textContent = sessionTitle(working)
    el.setAttribute('start-ms', String(sessionMs(working)))
  })
}
