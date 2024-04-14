import type { CollectionItem } from '../../types'
import { createContext } from '../../utils/context'
import type { UsePresenceProps } from '../presence'
import type { UseComboboxReturn } from './use-combobox'

export interface ComboboxContext<T extends CollectionItem>
  extends UseComboboxReturn<T>,
    UsePresenceProps {}

export const [ComboboxProvider, useComboboxContext] =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createContext<ComboboxContext<any>>('ComboboxContext')
