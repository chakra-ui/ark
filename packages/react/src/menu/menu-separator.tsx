import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuSeparatorProps = HTMLAtlasProps<'hr'>

export const MenuSeparator = forwardRef<'hr', MenuSeparatorProps>((props, ref) => {
  const { api } = useMenuContext()

  return <atlas.hr {...api.separatorProps} ref={ref} {...props} />
})
