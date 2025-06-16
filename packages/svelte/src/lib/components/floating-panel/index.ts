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
} from './floating-panel-body.svelte'
export {
  default as FloatingPanelCloseTrigger,
  type FloatingPanelCloseTriggerProps,
  type FloatingPanelCloseTriggerBaseProps,
} from './floating-panel-close-trigger.svelte'
export {
  default as FloatingPanelContent,
  type FloatingPanelContentProps,
  type FloatingPanelContentBaseProps,
} from './floating-panel-content.svelte'
export { default as FloatingPanelContext, type FloatingPanelContextProps } from './floating-panel-context.svelte'
export {
  default as FloatingPanelDragTrigger,
  type FloatingPanelDragTriggerProps,
  type FloatingPanelDragTriggerBaseProps,
} from './floating-panel-drag-trigger.svelte'
export {
  default as FloatingPanelHeader,
  type FloatingPanelHeaderProps,
  type FloatingPanelHeaderBaseProps,
} from './floating-panel-header.svelte'
export {
  default as FloatingPanelPositioner,
  type FloatingPanelPositionerProps,
  type FloatingPanelPositionerBaseProps,
} from './floating-panel-positioner.svelte'
export {
  default as FloatingPanelResizeTrigger,
  type FloatingPanelResizeTriggerProps,
  type FloatingPanelResizeTriggerBaseProps,
} from './floating-panel-resize-trigger.svelte'
export {
  default as FloatingPanelStageTrigger,
  type FloatingPanelStageTriggerProps,
  type FloatingPanelStageTriggerBaseProps,
} from './floating-panel-stage-trigger.svelte'
export {
  default as FloatingPanelRoot,
  type FloatingPanelRootProps,
  type FloatingPanelRootBaseProps,
} from './floating-panel-root.svelte'
export {
  default as FloatingPanelRootProvider,
  type FloatingPanelRootProviderProps,
  type FloatingPanelRootProviderBaseProps,
} from './floating-panel-root-provider.svelte'
export {
  default as FloatingPanelTitle,
  type FloatingPanelTitleProps,
  type FloatingPanelTitleBaseProps,
} from './floating-panel-title.svelte'
export {
  default as FloatingPanelTrigger,
  type FloatingPanelTriggerProps,
  type FloatingPanelTriggerBaseProps,
} from './floating-panel-trigger.svelte'
export {
  default as FloatingPanelControl,
  type FloatingPanelControlProps,
  type FloatingPanelControlBaseProps,
} from './floating-panel-control.svelte'

export { useFloatingPanel, type UseFloatingPanelProps, type UseFloatingPanelReturn } from './use-floating-panel.svelte'
export { useFloatingPanelContext, type UseFloatingPanelContext } from './use-floating-panel-context'
export { floatingPanelAnatomy } from './floating-panel.anatomy'

export * as FloatingPanel from './floating-panel'
