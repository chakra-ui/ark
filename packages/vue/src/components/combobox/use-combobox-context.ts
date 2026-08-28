import { createContext } from '../../utils/create-context.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { UsePresenceProps } from '../presence/index.ts'
import type { UseComboboxReturn } from './use-combobox.ts'

export interface UseComboboxContext<T extends CollectionItem = CollectionItem>
  extends UseComboboxReturn<T>, UsePresenceProps {}

export const [ComboboxProvider, useComboboxContext] = createContext<UseComboboxContext<any>>('ComboboxContext')
