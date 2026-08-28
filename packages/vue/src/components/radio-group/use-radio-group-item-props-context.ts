import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context.ts'

export interface UseRadioGroupItemPropsContext extends ItemProps {}

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] =
  createContext<UseRadioGroupItemPropsContext>('RadioGroupItemPropsContext')
