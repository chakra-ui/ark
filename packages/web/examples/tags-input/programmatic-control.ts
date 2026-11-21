import { createElement, X } from 'lucide'

import button from 'styles/button.module.css'

import '@ark-ui/web/tags-input'

import styles from 'styles/tags-input.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack">
      <div style="display: flex; gap: 8px">
        <button class="${button.Root}" type="button" data-action="react">Add React</button>
        <button class="${button.Root}" type="button" data-action="solid">Add Solid</button>
        <button class="${button.Root}" type="button" data-action="set">Set to Vue &amp; Svelte</button>
        <button class="${button.Root}" type="button" data-action="clear">Clear All</button>
      </div>
      
  <ark-tags-input class="${styles.Root}" >
    <ark-tags-input-label class="${styles.Label}">Frameworks</ark-tags-input-label>
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
  </ark-tags-input>
    </div>`
  const el = root.querySelector('ark-tags-input')!
  const actions: Record<string, VoidFunction> = {
    react: () => el.api?.addValue('React'),
    solid: () => el.api?.addValue('Solid'),
    set: () => el.api?.setValue(['Vue', 'Svelte']),
    clear: () => el.api?.clearValue(),
  }
  root.addEventListener('click', (event) => {
    const action = (event.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action
    if (action) actions[action]()
  })
}
