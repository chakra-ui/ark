import { createElement, Check } from 'lucide'

import '@ark-ui/web/checkbox'

import fieldset from 'styles/fieldset.module.css'

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

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

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
  root.innerHTML = /* html */ `
  <fieldset class="${fieldset.Root}">
    <legend class="${fieldset.Legend}">Select frameworks</legend>
    <span class="${fieldset.HelperText}">Choose your preferred frameworks</span>
    <ark-checkbox-group class="${styles.Group}" default-value="react" name="framework">
      ${frameworks.map(checkbox).join('')}
    </ark-checkbox-group>
  </fieldset>`
}
