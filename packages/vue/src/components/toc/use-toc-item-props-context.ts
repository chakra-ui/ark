import type { ItemProps } from '@zag-js/toc'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export const [TocItemPropsProvider, useTocItemPropsContext] =
  createContext<ComputedRef<ItemProps>>('TocItemPropsContext')
