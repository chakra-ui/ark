import type * as floatingPanel from '@zag-js/floating-panel'

import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

const stageOf = (el: HTMLElement) => ({ stage: (el.getAttribute('stage') ?? 'default') as floatingPanel.Stage })

const placementOf = (el: HTMLElement) => ({
  placement: (el.getAttribute('placement') ?? 'se') as floatingPanel.ResizeTriggerProps['placement'],
})

export const FloatingPanelTrigger = definePart<floatingPanel.Api, floatingPanel.TriggerState>({
  tag: 'ark-floating-panel-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
  state: (api) => api.getTriggerState(),
})

export const FloatingPanelPositioner = definePresencePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

export const FloatingPanelContent = definePresencePart<floatingPanel.Api, floatingPanel.ContentState>({
  tag: 'ark-floating-panel-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const FloatingPanelDragTrigger = definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-drag-trigger',
  root,
  props: (api) => api.getDragTriggerProps(),
})

export const FloatingPanelHeader = definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-header',
  root,
  props: (api) => api.getHeaderProps(),
})

export const FloatingPanelTitle = definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-title',
  root,
  props: (api) => api.getTitleProps(),
})

export const FloatingPanelControl = definePart<floatingPanel.Api, floatingPanel.ControlState>({
  tag: 'ark-floating-panel-control',
  root,
  props: (api) => api.getControlProps(),
  state: (api) => api.getControlState(),
})

export const FloatingPanelBody = definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-body',
  root,
  props: (api) => api.getBodyProps(),
})

export const FloatingPanelCloseTrigger = definePart<floatingPanel.Api>({
  tag: 'ark-floating-panel-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})

export const FloatingPanelStageTrigger = definePart<floatingPanel.Api, floatingPanel.StageTriggerState>({
  tag: 'ark-floating-panel-stage-trigger',
  root,
  attributes: ['stage'],
  target: wrappedButton,
  props: (api, el) => api.getStageTriggerProps(stageOf(el)),
  state: (api, el) => api.getStageTriggerState(stageOf(el)),
})

export const FloatingPanelResizeTrigger = definePart<floatingPanel.Api, floatingPanel.ResizeTriggerState>({
  tag: 'ark-floating-panel-resize-trigger',
  root,
  attributes: ['placement'],
  props: (api, el) => api.getResizeTriggerProps(placementOf(el)),
  state: (api, el) => api.getResizeTriggerState(placementOf(el)),
})
