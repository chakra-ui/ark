import { createContext } from '../../utils/create-context'
import type { SegmentGroupProps } from '@zag-js/date-input'

export interface UseDateInputSegmentGroupPropsContext extends SegmentGroupProps {}

export const [DateInputSegmentGroupPropsProvider, useDateInputSegmentGroupPropsContext] =
  createContext<UseDateInputSegmentGroupPropsContext>({
    hookName: 'useDateInputSegmentGroupPropsContext',
    providerName: '<DateInput.SegmentGroup />',
    strict: true,
  })
