import type { CollectionItem } from '../../types'
import { createContext } from '../../utils/context'
import type { UseSelectReturn } from './use-select'

export interface SelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] = createContext<SelectContext<any>>('SelectContext')
