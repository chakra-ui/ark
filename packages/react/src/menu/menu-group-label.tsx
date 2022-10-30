import * as React from 'react'
import { forwardRef } from '../forwardRef'
import { useMenuContext } from './menu-context'
import { Assign, splitProps } from '../splitProps'
import { atlas, HTMLAtlasProps } from '../factory'

export type MenuGroupLabelProps = Assign<
  HTMLAtlasProps<'label'>,
  {
    htmlFor: string
  }
>

export const MenuGroupLabel = forwardRef<'label', MenuGroupLabelProps>((props, ref) => {
  const { api } = useMenuContext()
  const [labelProps, htmlProps] = splitProps(props, ['htmlFor'])

  return <atlas.label {...api.getLabelProps(labelProps)} {...htmlProps} ref={ref} />
})
