export { layout as getSplitterLayout } from '@zag-js/splitter'
export type {
  ExpandCollapseDetails as SplitterExpandCollapseDetails,
  PanelData as SplitterPanelData,
  ResizeDetails as SplitterResizeDetails,
  ResizeEndDetails as SplitterResizeEndDetails,
} from '@zag-js/splitter'
export { default as SplitterContext, type SplitterContextProps } from './splitter-context.svelte'
export { default as SplitterPanel, type SplitterPanelBaseProps, type SplitterPanelProps } from './splitter-panel.svelte'
export {
  default as SplitterResizeTrigger,
  type SplitterResizeTriggerBaseProps,
  type SplitterResizeTriggerProps,
} from './splitter-resize-trigger.svelte'
export {
  default as SplitterResizeTriggerIndicator,
  type SplitterResizeTriggerIndicatorBaseProps,
  type SplitterResizeTriggerIndicatorProps,
} from './splitter-resize-trigger-indicator.svelte'
export {
  default as SplitterRootProvider,
  type SplitterRootProviderBaseProps,
  type SplitterRootProviderProps,
} from './splitter-root-provider.svelte'
export { default as SplitterRoot, type SplitterRootBaseProps, type SplitterRootProps } from './splitter-root.svelte'
export { useSplitterContext, type UseSplitterContext } from './use-splitter-context'
export { useSplitter, type UseSplitterProps, type UseSplitterReturn } from './use-splitter.svelte'

export * as Splitter from './splitter'
