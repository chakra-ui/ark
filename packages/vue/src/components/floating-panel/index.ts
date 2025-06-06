export type {
  OpenChangeDetails as FloatingPanelOpenChangeDetails,
  PositionChangeDetails as FloatingPanelPositionChangeDetails,
  SizeChangeDetails as FloatingPanelSizeChangeDetails,
  StageChangeDetails as FloatingPanelStageChangeDetails,
} from '@zag-js/floating-panel'

export {
  default as FloatingPanelBody,
  type FloatingPanelBodyProps,
  type FloatingPanelBodyBaseProps,
} from './floating-panel-body.vue'

export {
  default as FloatingPanelCloseTrigger,
  type FloatingPanelCloseTriggerProps,
  type FloatingPanelCloseTriggerBaseProps,
} from './floating-panel-close-trigger.vue'

export {
  default as FloatingPanelContent,
  type FloatingPanelContentProps,
  type FloatingPanelContentBaseProps,
} from './floating-panel-content.vue'

export { default as FloatingPanelContext, type FloatingPanelContextProps } from './floating-panel-context.vue'

export {
  default as FloatingPanelDragTrigger,
  type FloatingPanelDragTriggerProps,
  type FloatingPanelDragTriggerBaseProps,
} from './floating-panel-drag-trigger.vue'

export {
  default as FloatingPanelHeader,
  type FloatingPanelHeaderProps,
  type FloatingPanelHeaderBaseProps,
} from './floating-panel-header.vue'

export {
  default as FloatingPanelPositioner,
  type FloatingPanelPositionerProps,
  type FloatingPanelPositionerBaseProps,
} from './floating-panel-positioner.vue'

export {
  default as FloatingPanelResizeTrigger,
  type FloatingPanelResizeTriggerProps,
  type FloatingPanelResizeTriggerBaseProps,
} from './floating-panel-resize-trigger.vue'

export {
  default as FloatingPanelStageTrigger,
  type FloatingPanelStageTriggerProps,
  type FloatingPanelStageTriggerBaseProps,
} from './floating-panel-stage-trigger.vue'

export {
  default as FloatingPanelRoot,
  type FloatingPanelRootProps,
  type FloatingPanelRootBaseProps,
} from './floating-panel-root.vue'

export {
  default as FloatingPanelRootProvider,
  type FloatingPanelRootProviderProps,
  type FloatingPanelRootProviderBaseProps,
} from './floating-panel-root-provider.vue'

export {
  default as FloatingPanelTitle,
  type FloatingPanelTitleProps,
  type FloatingPanelTitleBaseProps,
} from './floating-panel-title.vue'

export {
  default as FloatingPanelTrigger,
  type FloatingPanelTriggerProps,
  type FloatingPanelTriggerBaseProps,
} from './floating-panel-trigger.vue'

export {
  default as FloatingPanelControl,
  type FloatingPanelControlProps,
  type FloatingPanelControlBaseProps,
} from './floating-panel-control.vue'

export { useFloatingPanel, type UseFloatingPanelProps, type UseFloatingPanelReturn } from './use-floating-panel'
export { useFloatingPanelContext, type UseFloatingPanelContext } from './use-floating-panel-context'
export { floatingPanelAnatomy } from './floating-panel.anatomy'

export * as FloatingPanel from './floating-panel'
