import { createElement, RotateCcw } from 'lucide'

import '../../src/components/signature-pad/index.js'

import styles from 'styles/signature-pad.module.css'

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <ark-signature-pad class="${styles.Root}">
    <ark-signature-pad-label class="${styles.Label}">Sign below</ark-signature-pad-label>
    <ark-signature-pad-control class="${styles.Control}">
      <ark-signature-pad-segment><svg class="${styles.Segment}"><title>Signature</title></svg></ark-signature-pad-segment>
      <ark-signature-pad-clear-trigger>
        <button class="${styles.ClearTrigger}">${createElement(RotateCcw, { 'aria-hidden': 'true' }).outerHTML}</button>
      </ark-signature-pad-clear-trigger>
      <ark-signature-pad-guide class="${styles.Guide}"></ark-signature-pad-guide>
    </ark-signature-pad-control>
  </ark-signature-pad>
  <div class="stack">
    <span>Image Preview</span>
    <img class="${styles.Image}" alt="Signature" hidden />
  </div>`

  const el = host.querySelector('ark-signature-pad')!
  const image = host.querySelector('img')!

  el.addEventListener('drawend', async (event) => {
    const url = await event.detail.getDataUrl('image/png')
    image.src = url
    image.hidden = !url
  })
  root.replaceChildren(host)
}
