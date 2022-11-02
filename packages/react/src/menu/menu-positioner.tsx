import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuPositionerProps = HTMLAtlasProps<'div'>

export const MenuPositioner = forwardRef<'div', MenuPositionerProps>((props, ref) => {
  const { api } = useMenuContext()

  return <atlas.div {...api.positionerProps} {...props} ref={ref} />
})
