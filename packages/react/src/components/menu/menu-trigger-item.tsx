import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

export interface MenuTriggerItemBaseProps extends PolymorphicProps {}
export interface MenuTriggerItemProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuTriggerItemBaseProps {}

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>((props, ref) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(getTriggerItemProps?.() ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuTriggerItem.displayName = 'MenuTriggerItem'
