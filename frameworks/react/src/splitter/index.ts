import type { SizeChangeDetails as SplitterSizeChangeDetails } from '@zag-js/splitter'
import { SplitterContext, type SplitterContextProps } from './splitter-context'
import { SplitterPanel, type SplitterPanelProps } from './splitter-panel'
import { SplitterResizeTrigger, type SplitterResizeTriggerProps } from './splitter-resize-trigger'
import { SplitterRoot, type SplitterRootProps } from './splitter-root'
import { useSplitterContext, type UseSplitterContext } from './use-splitter-context'

export * as Splitter from './splitter'

export { SplitterContext, SplitterPanel, SplitterResizeTrigger, SplitterRoot, useSplitterContext }

export type {
  SplitterContextProps,
  SplitterPanelProps,
  SplitterResizeTriggerProps,
  SplitterRootProps,
  SplitterSizeChangeDetails,
  UseSplitterContext,
}
