import type { ItemProps } from '@zag-js/toc'
import { createContext } from '../../utils/create-context'

export interface UseTocItemPropsContext extends ItemProps {}

export const [TocItemPropsProvider, useTocItemPropsContext] = createContext<UseTocItemPropsContext>({
  name: 'TocItemPropsContext',
  hookName: 'useTocItemPropsContext',
  providerName: '<TocItemPropsProvider />',
})
