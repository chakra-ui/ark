import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuTriggerProps extends HTMLArkProps<'button'> {}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>((props, ref) => {
  const context = useMenuContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    {
      ...context.triggerProps,
      'aria-controls': presenceApi.isUnmounted ? undefined : context.triggerProps['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

MenuTrigger.displayName = 'MenuTrigger'
