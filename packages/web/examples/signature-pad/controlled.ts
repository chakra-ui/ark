import { createElement, RotateCcw } from 'lucide'

import '../../src/components/signature-pad/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/signature-pad.module.css'

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <output>paths: 0</output>
  <ark-signature-pad class="${styles.Root}" paths="[]">
    <ark-signature-pad-label class="${styles.Label}">Sign below</ark-signature-pad-label>
    <ark-signature-pad-control class="${styles.Control}">
      <ark-signature-pad-segment><svg class="${styles.Segment}"><title>Signature</title></svg></ark-signature-pad-segment>
      <ark-signature-pad-clear-trigger>
        <button class="${styles.ClearTrigger}">${createElement(RotateCcw, { 'aria-hidden': 'true' }).outerHTML}</button>
      </ark-signature-pad-clear-trigger>
      <ark-signature-pad-guide class="${styles.Guide}"></ark-signature-pad-guide>
    </ark-signature-pad-control>
  </ark-signature-pad>
  <button class="${button.Root}" type="button" data-clear>Clear</button>`

  const el = host.querySelector('ark-signature-pad')!
  const output = host.querySelector('output')!

  const setPaths = (paths: string[]) => {
    const value = JSON.stringify(paths)
    if (el.getAttribute('paths') !== value) el.setAttribute('paths', value)
    output.textContent = `paths: ${paths.length}`
  }

  el.addEventListener('draw', (event) => setPaths(event.detail.paths))
  host.querySelector('[data-clear]')!.addEventListener('click', () => setPaths([]))
  root.replaceChildren(host)
}
