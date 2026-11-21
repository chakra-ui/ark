import type * as floatingPanel from '@zag-js/floating-panel'

import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

const simple = (tag: string, props: (api: floatingPanel.Api) => Record<string, unknown>) =>
  definePart<floatingPanel.Api>({ tag, root, props })

definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

definePresencePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-content',
  root,
  props: (api) => api.getContentProps(),
})

simple('ark-floating-panel-drag-trigger', (api) => api.getDragTriggerProps())
simple('ark-floating-panel-header', (api) => api.getHeaderProps())
simple('ark-floating-panel-title', (api) => api.getTitleProps())
simple('ark-floating-panel-control', (api) => api.getControlProps())
simple('ark-floating-panel-body', (api) => api.getBodyProps())

definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})

definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-stage-trigger',
  root,
  target: wrappedButton,
  props: (api, el) =>
    api.getStageTriggerProps({ stage: (el.getAttribute('stage') ?? 'default') as floatingPanel.Stage }),
})

definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-resize-trigger',
  root,
  props: (api, el) =>
    api.getResizeTriggerProps({
      placement: (el.getAttribute('placement') ?? 'se') as floatingPanel.ResizeTriggerProps['placement'],
    }),
})
