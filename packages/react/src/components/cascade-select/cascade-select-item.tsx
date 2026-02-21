import type { ItemProps } from '@zag-js/cascade-select'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { CascadeSelectItemProvider } from './use-cascade-select-item-context'
import { CascadeSelectItemPropsProvider } from './use-cascade-select-item-props-context'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectItemBaseProps extends ItemProps, PolymorphicProps {}
export interface CascadeSelectItemProps extends HTMLProps<'div'>, CascadeSelectItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const CascadeSelectItem = forwardRef<HTMLDivElement, CascadeSelectItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['item', 'indexPath', 'value'])
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getItemProps(itemProps), localProps)
  const itemState = cascadeSelect.getItemState(itemProps)

  return (
    <CascadeSelectItemPropsProvider value={itemProps}>
      <CascadeSelectItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </CascadeSelectItemProvider>
    </CascadeSelectItemPropsProvider>
  )
})

CascadeSelectItem.displayName = 'CascadeSelectItem'
