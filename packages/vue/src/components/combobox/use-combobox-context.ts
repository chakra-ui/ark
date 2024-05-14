import type { CollectionItem } from '../../types'
import { createContext } from '../../utils'
import type { UsePresenceProps } from '../presence'
import type { UseComboboxReturn } from './use-combobox'

export interface UseComboboxContext<T extends CollectionItem = CollectionItem>
  extends UseComboboxReturn<T>,
    UsePresenceProps {}

export const [ComboboxProvider, useComboboxContext] =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createContext<UseComboboxContext<any>>('ComboboxContext')
