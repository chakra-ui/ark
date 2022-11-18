import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuTriggerItemContext } from './menu-context'

export type MenuTriggerItemProps = HTMLArkProps<'div'>

export const MenuTriggerItem = forwardRef<'div', MenuTriggerItemProps>((props, ref) => {
  const getTriggerProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(getTriggerProps?.() ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})
