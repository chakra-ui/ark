import * as tree from '@zag-js/tree-view'

import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { collection, controlledList, listOf, root } from './shared.js'

type SelectionMode = NonNullable<tree.Props['selectionMode']>

defineRoot<tree.Api>({
  tag: root,
  machine: tree.machine,
  connect: tree.connect,

  attributes: [
    'selection-mode',
    'expanded-value',
    'default-expanded-value',
    'selected-value',
    'default-selected-value',
    'checked-value',
    'default-checked-value',
    'can-rename',
  ],
  properties: ['canRename', 'onBeforeRename', 'loadChildren', 'scrollToIndexFn', 'ids', 'translations'],
  ownProperties: ['collection'],
  propertyChanged: (el, name) => {
    if (name === 'collection') collection.update(el)
  },

  state: {
    expandedValue: {
      get: (api) => api.expandedValue,
      set: (api, value) => api.setExpandedValue(value),
    },
    selectedValue: {
      get: (api) => api.selectedValue,
      set: (api, value) => api.setSelectedValue(value),
    },
    checkedValue: {
      get: (api) => api.checkedValue,
      set: (api, value) => api.setChecked(value),
    },
  },
  props: (el) => ({
    collection: collection.get(el),
    selectionMode: str<SelectionMode>(el, 'selection-mode') ?? 'single',
    expandedValue: controlledList(el, 'expanded-value'),
    defaultExpandedValue: listOf(el.getAttribute('default-expanded-value')),
    selectedValue: controlledList(el, 'selected-value'),
    defaultSelectedValue: listOf(el.getAttribute('default-selected-value')),
    checkedValue: controlledList(el, 'checked-value'),
    defaultCheckedValue: controlledList(el, 'default-checked-value'),
    canRename: el.hasAttribute('can-rename') ? () => true : undefined,
  }),

  events: {
    onExpandedChange: 'expandedchange',
    onSelectionChange: 'selectionchange',
    onFocusChange: 'focuschange',
    onCheckedChange: 'checkedchange',
    onRenameStart: 'renamestart',
    onRenameComplete: 'renamecomplete',
    onLoadChildrenComplete: 'loadchildrencomplete',
    onLoadChildrenError: 'loadchildrenerror',
  },

  rootProps: (api) => api.getRootProps(),
  setup: (el) => collection.setup(el),
})
