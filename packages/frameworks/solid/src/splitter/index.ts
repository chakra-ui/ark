import type { SizeChangeDetails as SplitterSizeChangeDetails } from '@zag-js/splitter'
import { Splitter as SplitterRoot, type SplitterProps } from './splitter'
import { useSplitterContext, type SplitterContext } from './splitter-context'
import { SplitterPanel, type SplitterPanelProps } from './splitter-panel'
import { SplitterResizeTrigger, type SplitterResizeTriggerProps } from './splitter-resize-trigger'

const Splitter = Object.assign(SplitterRoot, {
  Root: SplitterRoot,
  Panel: SplitterPanel,
  ResizeTrigger: SplitterResizeTrigger,
})

export { Splitter, SplitterPanel, SplitterResizeTrigger, useSplitterContext }
export type {
  SplitterContext,
  SplitterPanelProps,
  SplitterProps,
  SplitterResizeTriggerProps,
  SplitterSizeChangeDetails,
}
