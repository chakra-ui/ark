import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { useMenuContext } from './menu-context'

export type MenuGroupLabelProps = Assign<
  HTMLArkProps<'label'>,
  {
    htmlFor: string
  }
>

export const MenuGroupLabel = forwardRef<'label', MenuGroupLabelProps>((props, ref) => {
  const { api } = useMenuContext()
  const [labelProps, htmlProps] = splitProps(props, ['htmlFor'])

  return <ark.label {...api.getLabelProps(labelProps)} {...htmlProps} ref={ref} />
})
