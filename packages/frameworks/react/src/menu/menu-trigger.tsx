import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export interface MenuTriggerProps extends HTMLArkProps<'button'> {}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.triggerProps ?? {}, props)

  return <ark.button {...mergedProps} ref={ref} />
})

MenuTrigger.displayName = 'MenuTrigger'
