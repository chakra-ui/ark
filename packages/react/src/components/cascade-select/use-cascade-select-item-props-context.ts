import type { ItemProps } from '@zag-js/cascade-select'
import { createContext } from '../../utils/create-context'

export const [CascadeSelectItemPropsProvider, useCascadeSelectItemPropsContext] = createContext<ItemProps>({
  name: 'CascadeSelectItemPropsContext',
  hookName: 'useCascadeSelectItemPropsContext',
  providerName: '<CascadeSelectItemPropsProvider />',
})
