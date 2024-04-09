import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

export interface MenuTriggerItemProps extends HTMLArkProps<'div'> {}

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>((props, ref) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(getTriggerItemProps?.() ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuTriggerItem.displayName = 'MenuTriggerItem'
