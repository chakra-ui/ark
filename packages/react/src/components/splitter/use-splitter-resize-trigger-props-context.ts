import type { ResizeTriggerProps } from '@zag-js/splitter'
import { createContext } from '../../utils/create-context'

export const [SplitterResizeTriggerPropsProvider, useSplitterResizeTriggerPropsContext] =
  createContext<ResizeTriggerProps>({
    name: 'SplitterResizeTriggerPropsContext',
    hookName: 'useSplitterResizeTriggerPropsContext',
    providerName: '<SplitterResizeTriggerPropsProvider />',
  })
