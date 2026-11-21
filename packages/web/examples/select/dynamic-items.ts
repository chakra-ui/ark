import { createElement, X, ChevronsUpDown, Check } from 'lucide'

import { createListCollection } from '../../src/components/select/index.js'

import styles from 'styles/select.module.css'

import button from 'styles/button.module.css'

const names = ['React', 'Solid', 'Vue', 'Svelte']

export function mount(container: HTMLElement) {
  container.innerHTML = /* html */ `
    <div>
      
  <ark-select class="${styles.Root}" >
    <ark-select-label class="${styles.Label}">Framework</ark-select-label>
    
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}"><ark-select-value-text class="${styles.ValueText}" placeholder="Select a Framework"></ark-select-value-text></button></ark-select-trigger>
    <div class="${styles.Indicators}"><ark-select-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-select-clear-trigger><ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator></div>
  </ark-select-control>
  <ark-select-positioner class="${styles.Positioner}">
    <ark-select-content class="${styles.Content}" >
      <ark-select-list class="${styles.List}"><template data-group>
  <ark-select-item-group class="${styles.ItemGroup}">
    <ark-select-item-group-label class="${styles.ItemGroupLabel}"></ark-select-item-group-label>
  </ark-select-item-group>
</template><template>
  <ark-select-item class="${styles.Item}"  >
    <ark-select-item-text class="${styles.ItemText}"></ark-select-item-text>
    <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
  </ark-select-item></template></ark-select-list>
    </ark-select-content>
  </ark-select-positioner>
  </ark-select>
      <button class="${button.Root}" style="margin-top: 1rem" type="button">Add Item</button>
    </div>`
  const el = container.querySelector('ark-select')!
  const items = [...names]
  const update = () => {
    el.collection = createListCollection({ items: [...items], groupBy: () => 'Frameworks' })
  }
  container.querySelector('button[type="button"]')!.addEventListener('click', () => {
    items.push('Angular')
    update()
  })
  update()
}
