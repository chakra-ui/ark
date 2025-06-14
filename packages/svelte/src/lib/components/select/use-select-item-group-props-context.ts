import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'

export interface UseSelectItemGroupPropsContext extends Accessor<{ id: string }> {}

export const [SelectItemGroupPropsProvider, useSelectItemGroupPropsContext] =
  createContext<UseSelectItemGroupPropsContext>({
    name: 'SelectItemGroupPropsContext',
  })
