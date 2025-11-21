import type { ResizeTriggerProps } from '@zag-js/splitter'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export const [SplitterResizeTriggerPropsProvider, useSplitterResizeTriggerPropsContext] = createContext<
  ComputedRef<ResizeTriggerProps>
>('SplitterResizeTriggerPropsContext')
