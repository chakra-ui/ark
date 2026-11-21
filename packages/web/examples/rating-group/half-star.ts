import { createElement, Star } from 'lucide'

import '../../src/components/rating-group/index.js'

import styles from 'styles/rating-group.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

interface RatingGroupProps {
  label: string
  defaultValue: number
  allowHalf?: boolean
}

const ratingGroup = ({ label, defaultValue, allowHalf }: RatingGroupProps) => /* html */ `
  <ark-rating-group class="${styles.Root}" default-value="${defaultValue}" ${attr('allow-half', allowHalf)}>
    <ark-rating-group-label class="${styles.Label}">${label}</ark-rating-group-label>
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
  root.innerHTML = ratingGroup({ label: 'Label', defaultValue: 2.5, allowHalf: true })
}
