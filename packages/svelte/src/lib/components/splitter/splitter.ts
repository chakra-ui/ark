export type { ExpandCollapseDetails, PanelData, ResizeDetails, ResizeEndDetails } from '@zag-js/splitter'
export { default as Context, type SplitterContextProps as ContextProps } from './splitter-context.svelte'
export {
  default as Panel,
  type SplitterPanelBaseProps as PanelBaseProps,
  type SplitterPanelProps as PanelProps,
} from './splitter-panel.svelte'
export {
  default as ResizeTrigger,
  type SplitterResizeTriggerBaseProps as ResizeTriggerBaseProps,
  type SplitterResizeTriggerProps as ResizeTriggerProps,
} from './splitter-resize-trigger.svelte'
export {
  default as Root,
  type SplitterRootBaseProps as RootBaseProps,
  type SplitterRootProps as RootProps,
} from './splitter-root.svelte'
export {
  default as RootProvider,
  type SplitterRootProviderBaseProps as RootProviderBaseProps,
  type SplitterRootProviderProps as RootProviderProps,
} from './splitter-root-provider.svelte'
