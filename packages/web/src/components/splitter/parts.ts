import type * as splitter from '@zag-js/splitter'
import { definePart } from '../../utils/define.js'
import { panelTag, root, panelValue } from './shared.js'

type TriggerId = splitter.ResizeTriggerId

definePart<splitter.Api>({
  tag: panelTag,
  root,
  props: (api, el) => api.getPanelProps({ id: panelValue(el) }),
})

definePart<splitter.Api>({
  tag: 'ark-splitter-resize-trigger',
  root,
  props: (api, el) =>
    api.getResizeTriggerProps({ id: panelValue(el) as TriggerId, disabled: el.hasAttribute('disabled') }),
})

definePart<splitter.Api>({
  tag: 'ark-splitter-resize-trigger-indicator',
  root,
  props: (api, el) =>
    api.getResizeTriggerIndicator({
      id: panelValue(el.closest('ark-splitter-resize-trigger') ?? el) as TriggerId,
    }),
})
