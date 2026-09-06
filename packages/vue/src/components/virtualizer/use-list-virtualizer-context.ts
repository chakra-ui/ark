import type { ListVirtualizer } from '@zag-js/virtualizer'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export interface UseListVirtualizerContext extends ComputedRef<ListVirtualizer> {}

export const [ListVirtualizerProvider, useListVirtualizerContext] =
  createContext<UseListVirtualizerContext>('ListVirtualizerContext')
