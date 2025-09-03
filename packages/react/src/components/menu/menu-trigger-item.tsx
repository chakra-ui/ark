import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context'

export interface MenuTriggerItemBaseProps extends PolymorphicProps {}
export interface MenuTriggerItemProps extends HTMLProps<'div'>, MenuTriggerItemBaseProps {}

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>((props, ref) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(getTriggerItemProps?.() ?? {}, props)

  return (
    <MenuItemPropsProvider value={{ value: (mergedProps as any)['data-value'] }}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemPropsProvider>
  )
})

MenuTriggerItem.displayName = 'MenuTriggerItem'
