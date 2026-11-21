import * as combobox from '@zag-js/combobox'
import { positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { collection, filteredOf, listOf, queries, root } from './shared.js'

definePresenceRoot<combobox.Api>({
  properties: ['scrollToIndexFn', 'navigate', 'ids', 'translations', 'positioning', 'items'],
  propertyChanged: (el, name) => {
    if (name === 'items') collection.update(el)
  },

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
    'allow-custom-value',
    'open-on-click',
    'input-behavior',
    'selection-behavior',
    ...positioningAttributes,
  ],
  props: (el) => ({
    collection: filteredOf(el),
    value: listOf(el, 'value'),
    defaultValue: listOf(el, 'default-value'),
    multiple: el.hasAttribute('multiple'),
    disabled: el.hasAttribute('disabled'),
    readOnly: el.hasAttribute('readonly'),
    invalid: el.hasAttribute('invalid'),
    required: el.hasAttribute('required'),
    name: str(el, 'name'),
    openOnClick: el.hasAttribute('open-on-click'),
    allowCustomValue: el.hasAttribute('allow-custom-value'),
    inputBehavior: str<combobox.Props['inputBehavior'] & string>(el, 'input-behavior') ?? 'none',
    selectionBehavior: str<combobox.Props['selectionBehavior'] & string>(el, 'selection-behavior') ?? 'replace',
    positioning: positioning(el),
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
  setup: (el) => {
    const cleanup = collection.setup(el)
    const onInput = (event: Event) => {
      const { inputValue, reason } = (event as CustomEvent<combobox.InputValueChangeDetails>).detail
      const query = reason === 'input-change' ? inputValue : ''
      if (query === (queries.get(el) ?? '')) return
      queries.set(el, query)
      el.refresh()
    }
    el.addEventListener('inputvaluechange', onInput)
    return () => {
      cleanup()
      el.removeEventListener('inputvaluechange', onInput)
    }
  },
})
