import { createElement, Check } from 'lucide'

import '../../src/components/listbox/index.js'

import styles from 'styles/listbox.module.css'

const json = (items: unknown[]) => /* html */ `<script type="application/json">${JSON.stringify(items)}</script>`

interface ListboxProps {
  label: string
  selectionMode: 'single' | 'multiple' | 'extended'
  defaultValue: string[]
  items: unknown[]
}

const listbox = ({ label, selectionMode, defaultValue, items }: ListboxProps, children: string[]) => /* html */ `
  <ark-listbox class="${styles.Root}" selection-mode="${selectionMode}" default-value="${defaultValue.join(',')}">
    ${json(items)}
    <ark-listbox-label class="${styles.Label}">${label}</ark-listbox-label>
    <ark-listbox-content class="${styles.Content}">
      <ark-listbox-list class="${styles.List}">${children.join('')}</ark-listbox-list>
    </ark-listbox-content>
  </ark-listbox>`

const item = () => /* html */ `
  <ark-listbox-item class="${styles.Item}">
    <ark-listbox-item-text class="${styles.ItemText}"></ark-listbox-item-text>
    <ark-listbox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-listbox-item-indicator>
  </ark-listbox-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = listbox(
    {
      label: 'Languages',
      selectionMode: 'multiple',
      defaultValue: ['ts'],
      items: [
        { value: 'ts', label: 'TypeScript' },
        { value: 'go', label: 'Go' },
        { value: 'rs', label: 'Rust' },
      ],
    },
    [/* html */ `<template>${item()}</template>`],
  )
}
