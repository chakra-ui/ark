import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ResizeTriggerProps } from '@zag-js/splitter'

export const [SplitterResizeTriggerPropsProvider, useSplitterResizeTriggerPropsContext] = createContext<
  Accessor<ResizeTriggerProps>
>({
  name: 'SplitterResizeTriggerPropsContext',
  hookName: 'useSplitterResizeTriggerPropsContext',
  providerName: '<SplitterResizeTriggerPropsProvider />',
})
