import { createElement, Play, RotateCcw } from 'lucide'

import '../../src/components/timer/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

const icon = (node: typeof Play) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const item = (type: string, label: string) => /* html */ `
  <div class="${styles.ItemGroup}">
    <ark-timer-item class="${styles.Item}" type="${type}"></ark-timer-item>
    <span class="${styles.ItemLabel}">${label}</span>
  </div>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-timer class="stack" target-ms="${60 * 1000}">
    <ark-timer-area class="${styles.Area}">
      ${item('minutes', 'minutes')}
      <ark-timer-separator class="${styles.Separator}">:</ark-timer-separator>
      ${item('seconds', 'seconds')}
    </ark-timer-area>
    <ark-timer-control class="hstack">
      <ark-timer-action-trigger action="start">
        <button class="${button.Root}">${icon(Play)} Start</button>
      </ark-timer-action-trigger>
      <ark-timer-action-trigger action="reset">
        <button class="${button.Root}">${icon(RotateCcw)} Reset</button>
      </ark-timer-action-trigger>
    </ark-timer-control>
    <output>Ticks: 0</output>
  </ark-timer>`

  const el = root.querySelector('ark-timer')!
  const output = root.querySelector('output')!
  let ticks = 0

  el.addEventListener('tick', () => {
    output.textContent = `Ticks: ${++ticks}`
  })

  el.addEventListener('complete', () => {
    console.log('Timer completed')
  })
}
