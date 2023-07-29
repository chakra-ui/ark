import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuContentProps = ComponentPropsWithoutRef<typeof ark.div>

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.contentProps ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuContent.displayName = 'MenuContent'
