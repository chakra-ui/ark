import type { ItemProps } from '@zag-js/toc'
import { createContext } from '../../utils/create-context.ts'

export interface UseTocItemPropsContext extends ItemProps {}

export const [TocItemPropsProvider, useTocItemPropsContext] = createContext<UseTocItemPropsContext>({
  hookName: 'useTocItemPropsContext',
  providerName: '<TocItemPropsProvider />',
})
