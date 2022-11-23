import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuSeparatorProps = HTMLArkProps<'hr'>

export const MenuSeparator = forwardRef<'hr', MenuSeparatorProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.separatorProps ?? {}, props)

  return <ark.hr {...mergedProps} ref={ref} />
})
