import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../../utils/create-context.ts'

export interface UseCommandItemPropsContext extends ItemProps {}

export const [CommandItemPropsProvider, useCommandItemPropsContext] =
  createContext<UseCommandItemPropsContext>('CommandItemPropsContext')
