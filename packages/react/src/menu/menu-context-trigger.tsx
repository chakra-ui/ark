import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuContextTriggerProps = HTMLArkProps<'button'>

export const MenuContextTrigger = forwardRef<'button'>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.contextTriggerProps ?? {}, props)

  return <ark.button {...mergedProps} ref={ref} />
})
