import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuContentProps = HTMLAtlasProps<'div'>

export const MenuContent = forwardRef<'div', MenuContentProps>((props, ref) => {
  const { api } = useMenuContext()

  return <atlas.div {...api.contentProps} {...props} ref={ref} />
})
