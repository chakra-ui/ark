import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import '../../src/components/combobox/index.js'

import styles from 'styles/combobox.module.css'

const json = (items: unknown[]) => /* html */ `<script type="application/json">${JSON.stringify(items)}</script>`

interface ComboboxProps {
  items: unknown[]
}

const comboboxMarkup = ({ items }: ComboboxProps, children: string[]) => /* html */ `
  <ark-combobox class="${styles.Root}">
    ${json(items)}
    <ark-combobox-label class="${styles.Label}">Favorite Fruit</ark-combobox-label>
    <ark-combobox-control class="${styles.Control}">
      <ark-combobox-input><input class="${styles.Input}" placeholder="e.g. Apple" /></ark-combobox-input>
      <div class="${styles.Indicators}">
        <ark-combobox-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-clear-trigger>
        <ark-combobox-trigger><button class="${styles.Trigger}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</button></ark-combobox-trigger>
      </div>
    </ark-combobox-control>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        <ark-combobox-empty class="${styles.Empty}">No results found</ark-combobox-empty>
        <ark-combobox-list class="${styles.List}">${children.join('')}</ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

const groupTemplate = /* html */ `
  <template data-group>
    <ark-combobox-item-group class="${styles.ItemGroup}">
      <ark-combobox-item-group-label class="${styles.ItemGroupLabel}"></ark-combobox-item-group-label>
    </ark-combobox-item-group>
  </template>`

const item = () => /* html */ `
  <ark-combobox-item class="${styles.Item}">
    <ark-combobox-item-text class="${styles.ItemText}"></ark-combobox-item-text>
    <ark-combobox-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-combobox-item-indicator>
  </ark-combobox-item>`

const produce = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = comboboxMarkup({ items: produce }, [groupTemplate, /* html */ `<template>${item()}</template>`])
}
