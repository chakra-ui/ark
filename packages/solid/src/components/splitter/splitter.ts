export { createSplitterRegistry as createRegistry } from './create-splitter-registry.ts'
export { layout as getLayout } from '@zag-js/splitter'
export type { ExpandCollapseDetails, PanelData, ResizeDetails, ResizeEndDetails } from '@zag-js/splitter'
export { SplitterContext as Context, type SplitterContextProps as ContextProps } from './splitter-context.tsx'
export {
  SplitterPanel as Panel,
  type SplitterPanelBaseProps as PanelBaseProps,
  type SplitterPanelProps as PanelProps,
} from './splitter-panel.tsx'
export {
  SplitterResizeTrigger as ResizeTrigger,
  type SplitterResizeTriggerBaseProps as ResizeTriggerBaseProps,
  type SplitterResizeTriggerProps as ResizeTriggerProps,
} from './splitter-resize-trigger.tsx'
export {
  SplitterResizeTriggerIndicator as ResizeTriggerIndicator,
  type SplitterResizeTriggerIndicatorBaseProps as ResizeTriggerIndicatorBaseProps,
  type SplitterResizeTriggerIndicatorProps as ResizeTriggerIndicatorProps,
} from './splitter-resize-trigger-indicator.tsx'
export {
  SplitterRoot as Root,
  type SplitterRootBaseProps as RootBaseProps,
  type SplitterRootProps as RootProps,
} from './splitter-root.tsx'
export {
  SplitterRootProvider as RootProvider,
  type SplitterRootProviderBaseProps as RootProviderBaseProps,
  type SplitterRootProviderProps as RootProviderProps,
} from './splitter-root-provider.tsx'
