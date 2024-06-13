import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/toggle-group'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupItemBaseProps extends ItemProps {}
export interface ToggleGroupItemProps
  extends Assign<HTMLArkProps<'button'>, ToggleGroupItemBaseProps> {}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const toggleGroup = useToggleGroupContext()
  const mergedProps = mergeProps(toggleGroup.getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

ToggleGroupItem.displayName = 'ToggleGroupItem'
