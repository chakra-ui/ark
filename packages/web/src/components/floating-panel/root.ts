import * as floatingPanel from '@zag-js/floating-panel'

import { controlled, num, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { flag, root } from './shared.js'

definePresenceRoot<floatingPanel.Api>({
  tag: root,
  machine: floatingPanel.machine,
  connect: floatingPanel.connect,
  present: (api) => api.open,

  attributes: [
    'open',
    'default-open',
    'draggable',
    'resizable',
    'strategy',
    'allow-overflow',
    'lock-aspect-ratio',
    'close-on-escape',
    'restore-focus',
    'disabled',
    'persist-rect',
    'grid-size',
  ],
  properties: [
    'ids',
    'translations',
    'size',
    'defaultSize',
    'minSize',
    'maxSize',
    'position',
    'defaultPosition',
    'getAnchorPosition',
    'getBoundaryEl',
    'initialFocusEl',
    'finalFocusEl',
  ],
  state: {
    open: {
      get: (api) => api.open,
      set: (api, open) => api.setOpen(!!open),
    },
  },
  props: (el) => ({
    open: controlled(el, 'open'),
    defaultOpen: el.hasAttribute('default-open'),
    draggable: flag(el, 'draggable'),
    resizable: flag(el, 'resizable'),
    strategy: str<'absolute' | 'fixed'>(el, 'strategy'),
    allowOverflow: flag(el, 'allow-overflow'),
    lockAspectRatio: flag(el, 'lock-aspect-ratio'),
    closeOnEscape: flag(el, 'close-on-escape'),
    restoreFocus: flag(el, 'restore-focus'),
    disabled: flag(el, 'disabled'),
    persistRect: flag(el, 'persist-rect'),
    gridSize: num(el, 'grid-size'),
  }),

  actions: {
    minimize: (api) => api.minimize(),
    maximize: (api) => api.maximize(),
    restore: (api) => api.restore(),
  },

  events: {
    onOpenChange: 'openchange',
    onPositionChange: 'positionchange',
    onPositionChangeEnd: 'positionchangeend',
    onSizeChange: 'sizechange',
    onSizeChangeEnd: 'sizechangeend',
    onStageChange: 'stagechange',
  },
})
