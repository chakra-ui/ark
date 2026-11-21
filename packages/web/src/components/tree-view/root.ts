import * as tree from '@zag-js/tree-view'
import { defineRoot } from '../../utils/define.js'
import { collection, controlledList, listOf, root } from './shared.js'

defineRoot<tree.Api>({
  properties: ['canRename', 'onBeforeRename', 'loadChildren', 'scrollToIndexFn', 'ids', 'translations', 'items'],
  propertyChanged: (el, name) => {
    if (name === 'items') collection.update(el)
  },

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
  props: (el) => ({
    collection: collection.get(el),
    selectionMode: (el.getAttribute('selection-mode') as tree.Props['selectionMode']) ?? 'single',
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
