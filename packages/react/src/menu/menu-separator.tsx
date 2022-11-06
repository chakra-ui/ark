import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuSeparatorProps = HTMLArkProps<'hr'>

export const MenuSeparator = forwardRef<'hr', MenuSeparatorProps>((props, ref) => {
  const { api } = useMenuContext()

  return <ark.hr {...api.separatorProps} ref={ref} {...props} />
})
