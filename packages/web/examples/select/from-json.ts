import { createElement, Check, ChevronsUpDown } from 'lucide'

import '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

interface JsonItem {
  value: string
  label: string
  disabled?: boolean
  group?: string
}

const items: JsonItem[] = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
]

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const attr = (name: string, on?: boolean) => (on ? name : '')

const valueText = ({ placeholder }: { placeholder: string }) => /* html */ `
  <ark-select-value-text class="${styles.ValueText}" placeholder="${placeholder}"></ark-select-value-text>`

const indicator = () => /* html */ `
  <ark-select-indicator class="${styles.Indicator}">${icon(ChevronsUpDown)}</ark-select-indicator>`

const control = ({ placeholder }: { placeholder: string }) => /* html */ `
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger>
      <button class="${styles.Trigger}">${valueText({ placeholder })}</button>
    </ark-select-trigger>
    <div class="${styles.Indicators}">${indicator()}</div>
  </ark-select-control>`

const list = (children: string[]) => /* html */ `
  <ark-select-list class="${styles.List}">${children.join('')}</ark-select-list>`

interface SelectProps {
  label: string
  name: string
  data: JsonItem[]
  lazy?: boolean
  unmountOnExit?: boolean
}

const select = ({ label, name, data, lazy, unmountOnExit }: SelectProps, children: string[]) => /* html */ `
  <ark-select class="${styles.Root}" name="${name}" ${attr('unmount-on-exit', unmountOnExit)}>
    <script type="application/json">${JSON.stringify(data)}</script>
    <ark-select-label class="${styles.Label}">${label}</ark-select-label>
    ${control({ placeholder: 'Select' })}
    <ark-select-positioner class="${styles.Positioner}">
      <ark-select-content class="${styles.Content}">
        ${lazy ? /* html */ `<template>${list(children)}</template>` : list(children)}
      </ark-select-content>
    </ark-select-positioner>
  </ark-select>`

const itemTemplate = () => /* html */ `
  <template>
    <ark-select-item class="${styles.Item}">
      <ark-select-item-text class="${styles.ItemText}"></ark-select-item-text>
      <ark-select-item-indicator class="${styles.ItemIndicator}">${icon(Check)}</ark-select-item-indicator>
    </ark-select-item>
  </template>`

export function mount(root: HTMLElement) {
  root.innerHTML = select({ label: 'Framework', name: 'framework', data: items }, [itemTemplate()])
}
