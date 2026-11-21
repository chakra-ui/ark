import { createElement, X } from 'lucide'

import '../../src/components/tags-input/index.js'

import styles from 'styles/tags-input.module.css'

const tagsInputMarkup = (attrs = '', { label = 'Frameworks', placeholder = 'Add Framework' } = {}) => /* html */ `
  <ark-tags-input class="${styles.Root}" ${attrs}>
    <ark-tags-input-label class="${styles.Label}">${label}</ark-tags-input-label>
    <ark-tags-input-control class="${styles.Control}">
      <template>
        <ark-tags-input-item class="${styles.Item}">
          <ark-tags-input-item-preview class="${styles.ItemPreview}">
            <ark-tags-input-item-text class="${styles.ItemText}"></ark-tags-input-item-text>
            <ark-tags-input-item-delete-trigger><button class="${styles.ItemDeleteTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-tags-input-item-delete-trigger>
          </ark-tags-input-item-preview>
          <ark-tags-input-item-input><input class="${styles.ItemInput}" /></ark-tags-input-item-input>
        </ark-tags-input-item>
      </template>
      <ark-tags-input-input><input class="${styles.Input}" placeholder="${placeholder}" /></ark-tags-input-input>
      <ark-tags-input-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-tags-input-clear-trigger>
    </ark-tags-input-control>
    <ark-tags-input-hidden-input></ark-tags-input-hidden-input>
  </ark-tags-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = tagsInputMarkup('blur-behavior="add"')
}
