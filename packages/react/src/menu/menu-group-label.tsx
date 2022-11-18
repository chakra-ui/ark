import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuGroupLabelParams = { htmlFor: string }
export type MenuGroupLabelProps = Assign<HTMLArkProps<'label'>, MenuGroupLabelParams>

export const MenuGroupLabel = forwardRef<'label', MenuGroupLabelProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [labelProps, htmlProps] = createSplitProps<MenuGroupLabelParams>()(props, ['htmlFor'])
  const mergedProps = mergeProps(api?.getLabelProps(labelProps) ?? {}, htmlProps)

  return <ark.label {...mergedProps} ref={ref} />
})
