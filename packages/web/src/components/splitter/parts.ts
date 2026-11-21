import type * as splitter from '@zag-js/splitter'
import { definePart } from '../../utils/define.js'
import { panelAttributes, panelTag, root, panelValue } from './shared.js'

type TriggerId = splitter.ResizeTriggerId

const triggerProps = (el: HTMLElement) => ({
  id: panelValue(el) as TriggerId,
  disabled: el.hasAttribute('disabled'),
})

export const SplitterPanel = definePart<splitter.Api>({
  tag: panelTag,
  root,
  attributes: panelAttributes,
  props: (api, el) => api.getPanelProps({ id: panelValue(el) }),
})

export const SplitterResizeTrigger = definePart<splitter.Api, splitter.ResizeTriggerState>({
  tag: 'ark-splitter-resize-trigger',
  root,
  attributes: ['value', 'disabled'],
  props: (api, el) => api.getResizeTriggerProps(triggerProps(el)),
  state: (api, el) => api.getResizeTriggerState(triggerProps(el)),
})

export const SplitterResizeTriggerIndicator = definePart<splitter.Api>({
  tag: 'ark-splitter-resize-trigger-indicator',
  root,
  props: (api, el) =>
    api.getResizeTriggerIndicator({
      id: panelValue(el.closest('ark-splitter-resize-trigger') ?? el) as TriggerId,
    }),
})
