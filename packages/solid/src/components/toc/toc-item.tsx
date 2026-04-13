import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/toc'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTocContext } from './use-toc-context'
import { TocItemPropsProvider } from './use-toc-item-props-context'

export interface TocItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TocItemProps extends HTMLProps<'li'>, TocItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const TocItem = (props: TocItemProps) => {
  const [itemProps, localProps] = splitItemProps(props, ['item'])
  const toc = useTocContext()
  const mergedProps = mergeProps(() => toc.getItemProps(itemProps), localProps)
  return (
    <TocItemPropsProvider value={itemProps}>
      <ark.li {...mergedProps} />
    </TocItemPropsProvider>
  )
}
