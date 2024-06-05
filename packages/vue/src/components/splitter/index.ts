export type { SizeChangeDetails as SplitterSizeChangeDetails } from '@zag-js/splitter'
export { default as SplitterContext, type SplitterContextProps } from './splitter-context.vue'
export { default as SplitterPanel, type SplitterPanelProps } from './splitter-panel.vue'
export {
  default as SplitterResizeTrigger,
  type SplitterResizeTriggerProps,
} from './splitter-resize-trigger.vue'
export {
  default as SplitterRootProvider,
  type SplitterRootProviderProps,
} from './splitter-root-provider.vue'
export {
  default as SplitterRoot,
  type SplitterRootEmits,
  type SplitterRootProps,
} from './splitter-root.vue'
export { useSplitter, type UseSplitterProps, type UseSplitterReturn } from './use-splitter'
export { useSplitterContext, type UseSplitterContext } from './use-splitter-context'

export * as Splitter from './splitter'
