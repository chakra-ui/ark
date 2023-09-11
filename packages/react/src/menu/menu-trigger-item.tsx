import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuTriggerItemContext } from './menu-context'

export type MenuTriggerItemProps = HTMLArkProps<'div'>

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>((props, ref) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(getTriggerItemProps?.() ?? {}, props)
  return <ark.div {...mergedProps} ref={ref} />
})

MenuTriggerItem.displayName = 'MenuTriggerItem'
