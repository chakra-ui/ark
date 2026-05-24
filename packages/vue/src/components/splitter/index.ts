export { layout as getSplitterLayout } from '@zag-js/splitter'
export type {
  ExpandCollapseDetails as SplitterExpandCollapseDetails,
  PanelData as SplitterPanelData,
  ResizeDetails as SplitterResizeDetails,
  ResizeEndDetails as SplitterResizeEndDetails,
} from '@zag-js/splitter'
export { default as SplitterContext, type SplitterContextProps } from './splitter-context.vue'
export { default as SplitterPanel, type SplitterPanelBaseProps, type SplitterPanelProps } from './splitter-panel.vue'
export {
  default as SplitterResizeTrigger,
  type SplitterResizeTriggerBaseProps,
  type SplitterResizeTriggerProps,
} from './splitter-resize-trigger.vue'
export {
  default as SplitterResizeTriggerIndicator,
  type SplitterResizeTriggerIndicatorBaseProps,
  type SplitterResizeTriggerIndicatorProps,
} from './splitter-resize-trigger-indicator.vue'
export {
  default as SplitterRootProvider,
  type SplitterRootProviderBaseProps,
  type SplitterRootProviderProps,
} from './splitter-root-provider.vue'
export {
  default as SplitterRoot,
  type SplitterRootBaseProps,
  type SplitterRootEmits,
  type SplitterRootProps,
} from './splitter-root.vue'
export {
  createSplitterRegistry,
  type SplitterRegistryProps,
  type SplitterRegistryReturn,
} from './create-splitter-registry.ts'
export { splitterAnatomy } from './splitter.anatomy.ts'
export { useSplitter, type UseSplitterProps, type UseSplitterReturn } from './use-splitter.ts'
export { useSplitterContext, type UseSplitterContext } from './use-splitter-context.ts'

export * as Splitter from './splitter.ts'
