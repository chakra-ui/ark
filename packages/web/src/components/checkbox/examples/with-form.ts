import { createElement, Check } from 'lucide'

import '@ark-ui/web/checkbox'

import styles from 'styles/checkbox.module.css'

import button from 'styles/button.module.css'

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  const form = document.createElement('form')
  form.style.display = 'grid'
  form.style.gap = '1rem'
  form.innerHTML = /* html */ `
    <ark-checkbox name="terms" value="accepted" required>
      <label class="${styles.Root}">
        <ark-checkbox-control class="${styles.Control}">
          <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
        </ark-checkbox-control>
        <ark-checkbox-label class="${styles.Label}">Accept terms</ark-checkbox-label>
        <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
      </label>
    </ark-checkbox>
    <button class="${button.Root}" type="submit">Submit</button>
    <output></output>`
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    form.querySelector('output')!.textContent = JSON.stringify(Object.fromEntries(new FormData(form)))
  })
  root.replaceChildren(form)
}
