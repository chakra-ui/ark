import type { ItemProps } from '@zag-js/cascade-select'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectListBaseProps extends ItemProps, PolymorphicProps {}
export interface CascadeSelectListProps extends HTMLProps<'div'>, CascadeSelectListBaseProps {}

const splitListProps = createSplitProps<ItemProps>()

export const CascadeSelectList = forwardRef<HTMLDivElement, CascadeSelectListProps>((props, ref) => {
  const [itemProps, localProps] = splitListProps(props, ['item', 'indexPath', 'value'])
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getListProps(itemProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

CascadeSelectList.displayName = 'CascadeSelectList'
