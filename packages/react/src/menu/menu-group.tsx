import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useMenuContext } from './menu-context'
import { splitProps } from '../splitProps'
import * as React from 'react'
import { useId } from 'react'

export type MenuGroupProps = HTMLAtlasProps<'div'>

export const MenuGroup = forwardRef<'div', MenuGroupProps>((props, ref) => {
  const { api } = useMenuContext()
  const [{ id: idProp }, htmlProps] = splitProps(props, ['id'])

  const generatedId = useId()
  const id = idProp ?? generatedId

  return <atlas.div {...api.getGroupProps({ id })} {...htmlProps} ref={ref} />
})
