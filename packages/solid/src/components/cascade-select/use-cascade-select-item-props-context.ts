import type { ItemProps } from '@zag-js/cascade-select'
import { createContext } from '../../utils/create-context'

export const [CascadeSelectItemPropsProvider, useCascadeSelectItemPropsContext] = createContext<ItemProps>({
  hookName: 'useCascadeSelectItemPropsContext',
  providerName: '<CascadeSelectItemPropsProvider />',
})
