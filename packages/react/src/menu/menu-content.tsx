import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuContentProps = HTMLArkProps<'div'>

export const MenuContent = forwardRef<'div', MenuContentProps>((props, ref) => {
  const { api } = useMenuContext()

  return <ark.div {...api.contentProps} {...props} ref={ref} />
})
