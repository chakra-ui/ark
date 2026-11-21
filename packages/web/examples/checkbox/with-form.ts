import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

import button from 'styles/button.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

interface CheckboxProps {
  label: string
  name: string
  value: string
  required?: boolean
}

const checkbox = ({ label, name, value, required }: CheckboxProps) => /* html */ `
  <ark-checkbox name="${name}" value="${value}" ${attr('required', required)}>
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  const form = document.createElement('form')
  form.style.display = 'grid'
  form.style.gap = '1rem'
  form.innerHTML = /* html */ `
    ${checkbox({ label: 'Accept terms', name: 'terms', value: 'accepted', required: true })}
    <button class="${button.Root}" type="submit">Submit</button>
    <output></output>`
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    form.querySelector('output')!.textContent = JSON.stringify(Object.fromEntries(new FormData(form)))
  })
  root.replaceChildren(form)
}
