import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuContentProps = HTMLArkProps<'div'>

export const MenuContent = forwardRef<'div', MenuContentProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.contentProps ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})
