import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

const root = (attrs: string, body: string, label = 'Framework') => /* html */ `
  <ark-select class="${styles.Root}" ${attrs}>
    <ark-select-label class="${styles.Label}">${label}</ark-select-label>
    ${body}
  </ark-select>`

const valueText = (placeholder: string) =>
  /* html */ `<ark-select-value-text class="${styles.ValueText}" placeholder="${placeholder}"></ark-select-value-text>`

const clearIcon = /* html */ `<ark-select-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-select-clear-trigger>`

const indicator = /* html */ `<ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>`

const control = (placeholder: string) => /* html */ `
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}">${valueText(placeholder)}</button></ark-select-trigger>
    <div class="${styles.Indicators}">${clearIcon}${indicator}</div>
  </ark-select-control>`

const popup = (list: string, { before = '', after = '', style = '' } = {}) => /* html */ `
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}" ${style ? `style="${style}"` : ''}>
      ${before}<ark-select-list class="${styles.List}">${list}</ark-select-list>${after}
    </ark-select-content>
  </ark-select-positioner>`

const group = (label: string, items: string) => /* html */ `
  <ark-select-item-group class="${styles.ItemGroup}" name="${label.toLowerCase()}">
    <ark-select-item-group-label class="${styles.ItemGroupLabel}">${label}</ark-select-item-group-label>
    ${items}
  </ark-select-item-group>`

const item = (value = '', label = '', disabled = false) => /* html */ `
  <ark-select-item class="${styles.Item}" ${value ? `value="${value}"` : ''} ${disabled ? 'disabled' : ''}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>`

const frameworkItems =
  item('react', 'React') + item('solid', 'Solid') + item('vue', 'Vue') + item('svelte', 'Svelte', true)

export function mount(container: HTMLElement) {
  container.innerHTML = root('multiple', control('Select') + popup(group('Frameworks', frameworkItems)))
}
