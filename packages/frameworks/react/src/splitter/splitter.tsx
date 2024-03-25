import type { SizeChangeDetails } from '@zag-js/splitter'
import { SplitterPanel as Panel, type SplitterPanelProps as PanelProps } from './splitter-panel'
import {
  SplitterResizeTrigger as ResizeTrigger,
  type SplitterResizeTriggerProps as ResizeTriggerProps,
} from './splitter-resize-trigger'
import { SplitterRoot as Root, type SplitterRootProps as RootProps } from './splitter-root'

export { Panel, ResizeTrigger, Root }
export type { PanelProps, ResizeTriggerProps, RootProps, SizeChangeDetails }
