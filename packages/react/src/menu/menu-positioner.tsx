import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuPositionerProps = HTMLArkProps<'div'>

export const MenuPositioner = forwardRef<'div', MenuPositionerProps>((props, ref) => {
  const { api } = useMenuContext()

  return <ark.div {...api.positionerProps} {...props} ref={ref} />
})
