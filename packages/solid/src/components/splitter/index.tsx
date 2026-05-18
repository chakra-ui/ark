export { layout as getSplitterLayout } from '@zag-js/splitter'
export type {
  ExpandCollapseDetails as SplitterExpandCollapseDetails,
  PanelData as SplitterPanelData,
  ResizeDetails as SplitterResizeDetails,
  ResizeEndDetails as SplitterResizeEndDetails,
} from '@zag-js/splitter'
export { SplitterContext, type SplitterContextProps } from './splitter-context.tsx'
export { SplitterPanel, type SplitterPanelBaseProps, type SplitterPanelProps } from './splitter-panel.tsx'
export {
  SplitterResizeTrigger,
  type SplitterResizeTriggerBaseProps,
  type SplitterResizeTriggerProps,
} from './splitter-resize-trigger.tsx'
export {
  SplitterResizeTriggerIndicator,
  type SplitterResizeTriggerIndicatorBaseProps,
  type SplitterResizeTriggerIndicatorProps,
} from './splitter-resize-trigger-indicator.tsx'
export { SplitterRoot, type SplitterRootBaseProps, type SplitterRootProps } from './splitter-root.tsx'
export {
  SplitterRootProvider,
  type SplitterRootProviderBaseProps,
  type SplitterRootProviderProps,
} from './splitter-root-provider.tsx'
export {
  createSplitterRegistry,
  type SplitterRegistryProps,
  type SplitterRegistryReturn,
} from './create-splitter-registry.ts'
export { splitterAnatomy } from './splitter.anatomy.ts'
export { useSplitter, type UseSplitterProps, type UseSplitterReturn } from './use-splitter.ts'
export { useSplitterContext, type UseSplitterContext } from './use-splitter-context.ts'

export * as Splitter from './splitter.ts'
