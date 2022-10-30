import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useMenuContext } from './menu-context'
import * as React from 'react'

export type MenuSeparatorProps = HTMLAtlasProps<'hr'>

export const MenuSeparator = forwardRef<'hr', MenuSeparatorProps>((props, ref) => {
  const { api } = useMenuContext()

  return <atlas.hr {...api.separatorProps} ref={ref} {...props} />
})
