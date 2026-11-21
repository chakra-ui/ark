import { createElement, Check } from 'lucide'

import '../../src/components/checkbox/index.js'

import styles from 'styles/checkbox.module.css'

interface Framework {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const attr = (name: string, on?: boolean) => (on ? name : '')

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

const group = ({ invalid }: { invalid?: boolean }, children: string[]) => /* html */ `
  <ark-checkbox-group class="${styles.Group}" ${attr('invalid', invalid)}>
    ${children.join('')}
  </ark-checkbox-group>`

const checkbox = ({ label, value }: Framework) => /* html */ `
  <ark-checkbox value="${value}">
    <label class="${styles.Root}">
      <ark-checkbox-control class="${styles.Control}">
        <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
      </ark-checkbox-control>
      <ark-checkbox-label class="${styles.Label}">${label}</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

export function mount(root: HTMLElement) {
  root.innerHTML = group({ invalid: true }, frameworks.map(checkbox))
}
