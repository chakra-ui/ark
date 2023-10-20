import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/toggle-group'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useToggleGroupContext } from './toggle-group-context'

export interface ToggleGroupItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useToggleGroupContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

ToggleGroupItem.displayName = 'ToggleGroupItem'
