import type { ItemProps } from '@zag-js/file-upload'
import { createContext } from '../../utils/create-context'

export interface UseDateInputSegmentContext extends ItemProps {}

export const [DateInputSegmentPropsProvider, useDateInputSegmentPropsContext] =
  createContext<UseDateInputSegmentContext>({
    name: 'DateInputSegmentPropsContext',
    hookName: 'useDateInputSegmentPropsContext',
    providerName: '<DateInputSegmentPropsProvider />',
  })
