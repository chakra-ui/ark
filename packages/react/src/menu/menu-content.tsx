import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuContentProps = HTMLArkProps<'div'>

export const MenuContent = forwardRef<'div'>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.contentProps ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})
