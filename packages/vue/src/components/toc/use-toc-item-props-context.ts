import type { ItemProps } from '@zag-js/toc'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export const [TocItemPropsProvider, useTocItemPropsContext] =
  createContext<ComputedRef<ItemProps>>('TocItemPropsContext')
