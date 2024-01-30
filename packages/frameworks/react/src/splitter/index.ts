import type { SizeChangeDetails as SplitterSizeChangeDetails } from '@zag-js/splitter'
import { useSplitterContext, type SplitterContext } from './splitter-context'
import { SplitterPanel, type SplitterPanelProps } from './splitter-panel'
import { SplitterResizeTrigger, type SplitterResizeTriggerProps } from './splitter-resize-trigger'
import { SplitterRoot, type SplitterRootProps } from './splitter-root'

export * as Splitter from './splitter'

export { SplitterPanel, SplitterResizeTrigger, SplitterRoot, useSplitterContext }

export type {
  SplitterContext,
  SplitterPanelProps,
  SplitterResizeTriggerProps,
  SplitterRootProps,
  SplitterSizeChangeDetails,
}
