import { forwardRef } from '../forwardRef'
import { useMenuContext } from './menu-context'
import { atlas, HTMLAtlasProps } from '../factory'
import * as React from 'react'

export type MenuPositionerProps = HTMLAtlasProps<'div'>

export const MenuPositioner = forwardRef<'div', MenuPositionerProps>((props, ref) => {
  const { api } = useMenuContext()

  return <atlas.div {...api.positionerProps} {...props} ref={ref} />
})
