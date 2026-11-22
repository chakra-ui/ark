import { createElement, ChevronsUpDown, X, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/select'

import styles from 'styles/select.module.css'

const names = ['React', 'Solid', 'Vue', 'Svelte']

export function mount(container: HTMLElement) {
  const max = 2
  container.innerHTML = /* html */ `
  <ark-select class="${styles.Root}" multiple value="">
    <ark-select-label class="${styles.Label}">Framework</ark-select-label>
    
  <ark-select-control class="${styles.Control}">
    <ark-select-trigger><button class="${styles.Trigger}"><ark-select-value-text class="${styles.ValueText}" placeholder="Select"></ark-select-value-text><ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator></button></ark-select-trigger>
    <ark-select-clear-trigger><button class="${styles.ClearTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-select-clear-trigger>
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
  </ark-select>`
  const el = container.querySelector('ark-select')!
  let value: string[] = []
  const update = () => {
    const full = value.length >= max
    el.collection = createListCollection({
      items: names,
      groupBy: () => 'Frameworks',
      isItemDisabled: (name) => full && !value.includes(name),
    })
    el.setAttribute('value', value.join(','))
  }
  el.addEventListener('valuechange', (event) => {
    const next = event.detail.value
    if (value.length >= max && next.length > value.length) return
    value = next
    update()
  })
  update()
}
