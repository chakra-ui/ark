import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuPositionerProps = HTMLArkProps<'div'>

export const MenuPositioner = forwardRef<'div', MenuPositionerProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.positionerProps ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})
