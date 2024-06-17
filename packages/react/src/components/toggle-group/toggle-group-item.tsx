import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/toggle-group'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ToggleGroupItemProps
  extends Assign<ButtonHTMLAttributes<HTMLButtonElement>, ToggleGroupItemBaseProps> {}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const toggleGroup = useToggleGroupContext()
  const mergedProps = mergeProps(toggleGroup.getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

ToggleGroupItem.displayName = 'ToggleGroupItem'
