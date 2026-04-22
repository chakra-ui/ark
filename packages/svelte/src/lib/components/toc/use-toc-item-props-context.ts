import { createContext } from '../../utils/create-context'
import type { ItemProps } from '@zag-js/toc'

export const [TocItemPropsProvider, useTocItemPropsContext] = createContext<() => ItemProps>({
  name: 'TocItemPropsContext',
  hookName: 'useTocItemPropsContext',
  providerName: '<TocItemPropsProvider />',
})
