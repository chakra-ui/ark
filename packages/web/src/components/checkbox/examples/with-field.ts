import { createElement, Check, Minus } from 'lucide'

import '@ark-ui/web/checkbox'
import '@ark-ui/web/field'

import field from 'styles/field.module.css'

import styles from 'styles/checkbox.module.css'

const checkIcon = createElement(Check, { 'aria-hidden': 'true' }).outerHTML

const minusIcon = createElement(Minus, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-field class="${field.Root}" data-inline>
    <ark-checkbox>
      <label class="${styles.Root}">
        <ark-checkbox-control class="${styles.Control}">
          <ark-checkbox-indicator class="${styles.Indicator}">${checkIcon}</ark-checkbox-indicator>
          <ark-checkbox-indicator class="${styles.Indicator}" indeterminate>${minusIcon}</ark-checkbox-indicator>
        </ark-checkbox-control>
        <ark-checkbox-label class="${styles.Label}">Label</ark-checkbox-label>
        <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
      </label>
    </ark-checkbox>
    <ark-field-helper-text class="${field.HelperText}">Additional Info</ark-field-helper-text>
    <ark-field-error-text class="${field.ErrorText}">Error Info</ark-field-error-text>
  </ark-field>`
}
