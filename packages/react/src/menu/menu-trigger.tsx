import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuTriggerProps = HTMLArkProps<'button'>

export const MenuTrigger = forwardRef<'button'>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.triggerProps ?? {}, props)

  return <ark.button {...mergedProps} ref={ref} />
})
