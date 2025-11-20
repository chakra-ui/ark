export { layout as getLayout } from '@zag-js/splitter'
export type { ExpandCollapseDetails, PanelData, ResizeDetails, ResizeEndDetails } from '@zag-js/splitter'
export { default as Context, type SplitterContextProps as ContextProps } from './splitter-context.vue'
export {
  default as Panel,
  type SplitterPanelBaseProps as PanelBaseProps,
  type SplitterPanelProps as PanelProps,
} from './splitter-panel.vue'
export {
  default as ResizeTrigger,
  type SplitterResizeTriggerBaseProps as ResizeTriggerBaseProps,
  type SplitterResizeTriggerProps as ResizeTriggerProps,
} from './splitter-resize-trigger.vue'
export {
  default as ResizeTriggerIndicator,
  type SplitterResizeTriggerIndicatorBaseProps as ResizeTriggerIndicatorBaseProps,
  type SplitterResizeTriggerIndicatorProps as ResizeTriggerIndicatorProps,
} from './splitter-resize-trigger-indicator.vue'
export {
  default as RootProvider,
  type SplitterRootProviderBaseProps as RootProviderBaseProps,
  type SplitterRootProviderProps as RootProviderProps,
} from './splitter-root-provider.vue'
export {
  default as Root,
  type SplitterRootBaseProps as RootBaseProps,
  type SplitterRootEmits as RootEmits,
  type SplitterRootProps as RootProps,
} from './splitter-root.vue'
