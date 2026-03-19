import type { ItemGroupProps } from '@zag-js/file-upload'
import { createContext } from '../../utils/create-context'

export interface UseDateInputSegmentGroupContext extends ItemGroupProps {}

export const [DateInputSegmentGroupPropsProvider, useDateInputSegmentGroupPropsContext] =
  createContext<UseDateInputSegmentGroupContext>({
    name: 'DateInputSegmentGroupPropsContext',
    hookName: 'useDateInputSegmentGroupPropsContext',
    providerName: '<DateInputSegmentGroupPropsProvider />',
  })
