'use client'

import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context.ts'

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] = createContext<ItemProps>({
  name: 'RadioGroupItemPropsContext',
  hookName: 'useRadioGroupItemPropsContext',
  providerName: '<RadioGroupItemPropsProvider />',
})
