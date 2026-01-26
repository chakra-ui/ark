import { createContext } from '../../utils/create-context'
import type { CollectionItem } from '../collection'
import type { UsePresenceProps } from '../presence'
import type { UseComboboxReturn } from './use-combobox'

export interface UseComboboxContext<T extends CollectionItem = CollectionItem>
  extends UseComboboxReturn<T>, UsePresenceProps {}

export const [ComboboxProvider, useComboboxContext] = createContext<UseComboboxContext<any>>('ComboboxContext')
