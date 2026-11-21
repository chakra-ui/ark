import * as steps from '@zag-js/steps'

import { list, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { itemAttributes, readItems, root } from './shared.js'

type Orientation = NonNullable<steps.Props['orientation']>

const controlledValue = (el: Element) => (el.hasAttribute('value') ? str(el, 'value') : undefined)

const controlledCompleted = (el: Element) => {
  if (!el.hasAttribute('completed-values')) return undefined
  return list(el, 'completed-values') ?? []
}

const itemsKey = (el: HTMLElement) => JSON.stringify(readItems(el))

const observeItems = (el: HTMLElement & { refresh(): void }) => {
  let key = itemsKey(el)

  const observer = new MutationObserver(() => {
    const next = itemsKey(el)
    if (next === key) return
    key = next
    el.refresh()
  })

  observer.observe(el, {
    subtree: true,
    childList: true,
    attributeFilter: itemAttributes,
  })

  return () => observer.disconnect()
}

defineRoot<steps.Api>({
  tag: root,
  machine: steps.machine,
  connect: steps.connect,

  attributes: ['value', 'default-value', 'completed-values', 'default-completed-values', 'orientation', 'linear'],
  properties: ['items', 'ids', 'translations'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
    completedValues: {
      get: (api) => api.completedValues,
      set: (api, value) => api.setCompletedValues(value),
    },
  },
  props: (el) => ({
    items: readItems(el),
    value: controlledValue(el),
    defaultValue: str(el, 'default-value'),
    completedValues: controlledCompleted(el),
    defaultCompletedValues: list(el, 'default-completed-values'),
    orientation: str<Orientation>(el, 'orientation') ?? 'horizontal',
    linear: el.hasAttribute('linear'),
  }),

  events: {
    onValueChange: 'valuechange',
    onCompletedChange: 'completedchange',
    onNavigationBlocked: 'navigationblocked',
    onComplete: 'complete',
  },

  setup: observeItems,
  rootProps: (api) => api.getRootProps(),
})
