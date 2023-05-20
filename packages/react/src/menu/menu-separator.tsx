import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuSeparatorProps = HTMLArkProps<'hr'>

export const MenuSeparator = forwardRef<'hr', MenuSeparatorProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.separatorProps ?? {}, props)

  return <ark.hr {...mergedProps} ref={ref} />
})
