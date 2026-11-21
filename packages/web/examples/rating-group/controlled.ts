import { createElement, Star } from 'lucide'

import '../../src/components/rating-group/index.js'

import styles from 'styles/rating-group.module.css'

const ratingGroup = (attrs: string) => `
  <ark-rating-group class="${styles.Root}" ${attrs}>
    <ark-rating-group-label class="${styles.Label}">Label</ark-rating-group-label>
    <ark-rating-group-control class="${styles.Control}">
      <template>
        <ark-rating-group-item class="${styles.Item}">
          <ark-rating-group-item-indicator class="${styles.ItemIndicator}">
            ${createElement(Star, { 'aria-hidden': 'true', 'data-bg': '' }).outerHTML}
            ${createElement(Star, { 'aria-hidden': 'true', 'data-fg': '', fill: 'currentColor' }).outerHTML}
          </ark-rating-group-item-indicator>
        </ark-rating-group-item>
      </template>
      <ark-rating-group-hidden-input></ark-rating-group-hidden-input>
    </ark-rating-group-control>
  </ark-rating-group>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = ratingGroup(`value="0"`)
  const el = host.querySelector('ark-rating-group')!
  el.addEventListener('valuechange', (event) => {
    el.setAttribute('value', String(event.detail.value))
  })
  root.replaceChildren(host)
}
