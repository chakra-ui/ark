import { forwardRef } from '../forwardRef'
import { useMenuContext } from './menu-context'
import { atlas, HTMLAtlasProps } from '../factory'
import * as React from 'react'

export type MenuContentProps = HTMLAtlasProps<'div'>

export const MenuContent = forwardRef<'div', MenuContentProps>((props, ref) => {
  const { api } = useMenuContext()

  return <atlas.div {...api.contentProps} {...props} ref={ref} />
})
