import type { ItemGroupProps } from '@zag-js/combobox'
import { createContext } from '../../utils/create-context.ts'

export interface UseCommandItemGroupPropsContext extends ItemGroupProps {}

export const [CommandItemGroupPropsProvider, useCommandItemGroupPropsContext] =
  createContext<UseCommandItemGroupPropsContext>('CommandItemGroupPropsContext')
