import { createElement, Pause, Play, RotateCcw } from 'lucide'

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

const WORK_MS = 25 * 60 * 1000

const BREAK_MS = 5 * 60 * 1000

const segments: Segment[] = [
  { type: 'minutes', label: 'minutes' },
  { type: 'seconds', label: 'seconds' },
]

const actions: Action[] = [
  { action: 'start', icon: Play, label: 'Start' },
  { action: 'pause', icon: Pause, label: 'Pause' },
  { action: 'reset', icon: RotateCcw, label: 'Reset' },
]

const icon = (node: typeof Play) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const timerItem = ({ type, label }: Segment) => /* html */ `
  <div class="${styles.ItemGroup}">
    <ark-timer-item class="${styles.Item}" type="${type}"></ark-timer-item>
    <span class="${styles.ItemLabel}">${label}</span>
  </div>`

const separator = (text: string) =>
  /* html */ `<ark-timer-separator class="${styles.Separator}">${text}</ark-timer-separator>`

const area = ({ segments, separator: text = ':' }: { segments: Segment[]; separator?: string }) => /* html */ `
  <ark-timer-area class="${styles.Area}">
    ${segments.map(timerItem).join(separator(text))}
  </ark-timer-area>`

const actionTrigger = ({ action, icon: node, label }: Action) => /* html */ `
  <ark-timer-action-trigger action="${action}">
    <button class="${button.Root}">${icon(node)} ${label}</button>
  </ark-timer-action-trigger>`

const control = (actions: Action[]) => /* html */ `
  <ark-timer-control class="hstack">
    ${actions.map(actionTrigger).join('')}
  </ark-timer-control>`

const sessionTitle = (working: boolean) => (working ? 'Work Session' : 'Break Session')

const sessionMs = (working: boolean) => (working ? WORK_MS : BREAK_MS)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-timer class="stack" countdown start-ms="${WORK_MS}">
    <h2>${sessionTitle(true)}</h2>
    ${area({ segments })}
    ${control(actions)}
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
