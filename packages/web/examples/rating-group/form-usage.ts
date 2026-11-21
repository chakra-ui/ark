import { createElement, Star } from 'lucide'

import '../../src/components/rating-group/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/rating-group.module.css'

interface RatingGroupProps {
  label: string
  name: string
  defaultValue: number
}

const ratingGroup = ({ label, name, defaultValue }: RatingGroupProps) => /* html */ `
  <ark-rating-group class="${styles.Root}" name="${name}" default-value="${defaultValue}">
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
  const form = document.createElement('form')
  form.className = 'stack'
  form.innerHTML = /* html */ `
    ${ratingGroup({ label: 'Label', name: 'review', defaultValue: 3 })}
    <button type="submit" class="${button.Root}">Submit</button>
    <output></output>`
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    form.querySelector('output')!.textContent = `Rating value: ${new FormData(form).get('review')}`
  })
  root.replaceChildren(form)
}
