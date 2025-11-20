import type { ResizeTriggerProps } from '@zag-js/splitter'
import { createContext } from '../../utils/create-context'

export const [SplitterResizeTriggerPropsProvider, useSplitterResizeTriggerPropsContext] =
  createContext<ResizeTriggerProps>({
    hookName: 'useSplitterResizeTriggerPropsContext',
    providerName: '<SplitterResizeTriggerPropsProvider />',
  })
