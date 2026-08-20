import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/toc'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'
import { TocItemPropsProvider } from './use-toc-item-props-context'

export interface TocItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TocItemProps extends HTMLProps<'li'>, TocItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const TocItem = forwardRef<HTMLLIElement, TocItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['item'])
  const toc = useTocContext()
  const mergedProps = mergeProps(toc.getItemProps(itemProps), localProps)

  return (
    <TocItemPropsProvider value={itemProps}>
      <ark.li {...mergedProps} ref={ref} />
    </TocItemPropsProvider>
  )
})

TocItem.displayName = 'TocItem'
