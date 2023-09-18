import { Splitter as SplitterRoot, type SplitterProps } from './splitter'
import { useSplitterContext } from './splitter-context'
import { SplitterPanel, type SplitterPanelProps } from './splitter-panel'
import { SplitterResizeTrigger, type SplitterResizeTriggerProps } from './splitter-resize-trigger'
import { splitterAnatomy } from './splitter.anatomy'

const Splitter = Object.assign(SplitterRoot, {
  Root: SplitterRoot,
  Panel: SplitterPanel,
  ResizeTrigger: SplitterResizeTrigger,
})

export { Splitter, SplitterPanel, SplitterResizeTrigger, splitterAnatomy, useSplitterContext }
export type { SplitterPanelProps, SplitterProps, SplitterResizeTriggerProps }
