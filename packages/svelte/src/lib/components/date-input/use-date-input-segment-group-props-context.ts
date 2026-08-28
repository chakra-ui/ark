import type { Accessor } from '$lib/types.js'
import { createContext } from '../../utils/create-context.js'
import type { SegmentGroupProps } from '@zag-js/date-input'

export interface UseDateInputSegmentGroupPropsContext extends Accessor<SegmentGroupProps> {}

export const [DateInputSegmentGroupPropsProvider, useDateInputSegmentGroupPropsContext] =
  createContext<UseDateInputSegmentGroupPropsContext>({
    name: 'DateInputSegmentGroupPropsContext',
    hookName: 'useDateInputSegmentGroupPropsContext',
    providerName: '<DateInput.SegmentGroup />',
    strict: true,
  })
