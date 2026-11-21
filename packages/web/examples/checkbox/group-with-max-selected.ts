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

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

interface GroupProps {
  defaultValue: string
  maxSelected: number
  name: string
}

const group = ({ defaultValue, maxSelected, name }: GroupProps, children: string[]) => /* html */ `
  <ark-checkbox-group class="${styles.Group}" default-value="${defaultValue}" max-selected="${maxSelected}" name="${name}">
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
  root.innerHTML = group(
    { defaultValue: 'react', maxSelected: 2, name: 'framework' },
    [...frameworks, { label: 'Svelte', value: 'svelte' }].map(checkbox),
  )
}
