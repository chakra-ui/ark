import { createContext } from '../context'
import type { UsePresenceProps } from '../presence'
import type { CollectionItem } from '../types'
import { type UseComboboxReturn } from './use-combobox'

export interface ComboboxContext<T extends CollectionItem>
  extends UseComboboxReturn<T>,
    UsePresenceProps {}

export const [ComboboxProvider, useComboboxContext] =
  createContext<ComboboxContext<any>>('ComboboxContext')
