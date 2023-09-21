import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useToggleGroupContext } from './toggle-group-context'

// TODO export from zag.js
interface ItemProps {
  value: string
  disabled?: boolean
}

export interface ToggleGroupItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>((props, ref) => {
  const [toggleProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useToggleGroupContext()
  const mergedProps = mergeProps(api.getItemProps(toggleProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

ToggleGroupItem.displayName = 'ToggleGroupItem'
