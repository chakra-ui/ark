import * as combobox from '@zag-js/combobox'

import { positioning, positioningAttributes, str } from '../../utils/attrs.js'
import type { RootElement } from '../../utils/define.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { collection, filteredOf, listOf, queries, root } from './shared.js'
import { withField } from '../../utils/field.js'

function setQuery(el: RootElement<combobox.Api>, query: string) {
  if (query === (queries.get(el) ?? '')) return

  queries.set(el, query)
  el.refresh()
}

const assignedQueries = new WeakMap<HTMLElement, string>()

function queryOf(el: HTMLElement, { inputValue, reason }: combobox.InputValueChangeDetails) {
  const assigned = assignedQueries.get(el) === inputValue
  assignedQueries.delete(el)

  return reason === 'input-change' || assigned ? inputValue : ''
}

type InputBehavior = NonNullable<combobox.Props['inputBehavior']>
type SelectionBehavior = NonNullable<combobox.Props['selectionBehavior']>

definePresenceRoot<combobox.Api>({
  tag: root,
  machine: combobox.machine,
  connect: combobox.connect,
  present: (api) => api.open,

  attributes: [
    'value',
    'default-value',
    'multiple',
    'disabled',
    'readonly',
    'invalid',
    'required',
    'name',
    'filter',
    'limit',
    'loading',
    'allow-custom-value',
    'open-on-click',
    'open-on-key-press',
    'input-behavior',
    'selection-behavior',
    ...positioningAttributes,
  ],
  properties: ['scrollToIndexFn', 'navigate', 'ids', 'translations', 'positioning', 'openOnChange'],
  ownProperties: ['collection'],
  propertyChanged: (el, name) => {
    if (name === 'collection') collection.update(el)
  },

  state: {
    open: {
      get: (api) => api.open,
      set: (api, open) => api.setOpen(!!open),
    },
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
    inputValue: {
      get: (api) => api.inputValue,
      set: (api, value, el) => {
        assignedQueries.set(el, value)
        api.setInputValue(value)
      },
    },
  },

  actions: {
    clearValue: (api, value?: string) => api.clearValue(value),
  },

  props: (el) =>
    withField(el, 'input', {
      collection: filteredOf(el),
      value: listOf(el, 'value'),
      defaultValue: listOf(el, 'default-value'),
      multiple: el.hasAttribute('multiple'),
      disabled: el.hasAttribute('disabled'),
      readOnly: el.hasAttribute('readonly'),
      invalid: el.hasAttribute('invalid'),
      required: el.hasAttribute('required'),
      loading: el.hasAttribute('loading'),
      name: str(el, 'name'),
      openOnClick: el.hasAttribute('open-on-click'),
      openOnKeyPress: el.getAttribute('open-on-key-press') !== 'false',
      allowCustomValue: el.hasAttribute('allow-custom-value'),
      inputBehavior: str<InputBehavior>(el, 'input-behavior') ?? 'none',
      selectionBehavior: str<SelectionBehavior>(el, 'selection-behavior') ?? 'replace',
      positioning: positioning(el),
      onInputValueChange: (details: combobox.InputValueChangeDetails) => setQuery(el, queryOf(el, details)),
    }),

  events: {
    onInputValueChange: 'inputvaluechange',
    onValueChange: 'valuechange',
    onHighlightChange: 'highlightchange',
    onSelect: 'itemselect',
    onOpenChange: 'openchange',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },

  rootProps: (api) => api.getRootProps(),
  setup: (el) => collection.setup(el),
})
