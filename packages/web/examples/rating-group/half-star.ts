import { createElement, Star } from 'lucide'

import '@ark-ui/web/rating-group'

import styles from 'styles/rating-group.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-rating-group class="${styles.Root}" default-value="2.5" allow-half>
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
}
