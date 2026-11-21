import { createElement, X } from 'lucide'

import type { TagsInputElement } from '../../src/components/tags-input/index.js'

import '../../src/components/tags-input/index.js'

import styles from 'styles/tags-input.module.css'

const TAG_PATTERN = /^[a-zA-Z0-9-]+$/

const validateTag = ({ value, inputValue }: { value: string[]; inputValue: string }) =>
  !!inputValue?.trim() && !value.includes(inputValue) && inputValue.length >= 3 && TAG_PATTERN.test(inputValue)

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-tags-input class="${styles.Root}" >
    <ark-tags-input-label class="${styles.Label}">Frameworks (Min 3 chars, alphanumeric)</ark-tags-input-label>
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
      <ark-tags-input-input><input class="${styles.Input}" placeholder="Add Framework" /></ark-tags-input-input>
      <ark-tags-input-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-tags-input-clear-trigger>
    </ark-tags-input-control>
    <ark-tags-input-hidden-input></ark-tags-input-hidden-input>
  </ark-tags-input>`
  root.querySelector('ark-tags-input')!.validate = validateTag
}
