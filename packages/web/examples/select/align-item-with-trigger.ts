import { createElement, ChevronsUpDown, Check, ChevronUp, ChevronDown } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

const root = (attrs: string, body: string, label = 'Framework') => /* html */ `
  <ark-select class="${styles.Root}" ${attrs}>
    <ark-select-label class="${styles.Label}">${label}</ark-select-label>
    ${body}
  </ark-select>`

const clearText = /* html */ `<ark-select-clear-trigger><button class="${styles.ClearTrigger}">Clear</button></ark-select-clear-trigger>`

const valueText = (placeholder: string) =>
  /* html */ `<ark-select-value-text class="${styles.ValueText}" placeholder="${placeholder}"></ark-select-value-text>`

const indicator = /* html */ `<ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>`

const inlineControl = (placeholder: string, clear = clearText) => /* html */ `
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}">${valueText(placeholder)}${indicator}</button></ark-select-trigger>
    ${clear}
  </ark-select-control>`

const popup = (list: string, { before = '', after = '', style = '' } = {}) => /* html */ `
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}" ${style ? `style="${style}"` : ''}>
      ${before}<ark-select-list class="${styles.List}">${list}</ark-select-list>${after}
    </ark-select-content>
  </ark-select-positioner>`

const item = (value = '', label = '', disabled = false) => /* html */ `
  <ark-select-item class="${styles.Item}" ${value ? `value="${value}"` : ''} ${disabled ? 'disabled' : ''}>
    <ark-select-item-text class="${styles.ItemText}">${label}</ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item>`

export function mount(container: HTMLElement) {
  container.innerHTML = root(
    'align-item-with-trigger default-value="solid"',
    inlineControl('Select', '') +
      popup(
        item('angular', 'Angular') +
          item('ember', 'Ember') +
          item('lit', 'Lit') +
          item('preact', 'Preact') +
          item('qwik', 'Qwik') +
          item('react', 'React') +
          item('solid', 'Solid') +
          item('svelte', 'Svelte') +
          item('vue', 'Vue'),
        {
          before: /* html */ `<ark-select-scroll-arrow class="${styles.ScrollArrow}" placement="top">${createElement(ChevronUp, { 'aria-hidden': 'true' }).outerHTML}</ark-select-scroll-arrow>`,
          after: /* html */ `<ark-select-scroll-arrow class="${styles.ScrollArrow}" placement="bottom">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-scroll-arrow>`,
        },
      ),
  )
}
