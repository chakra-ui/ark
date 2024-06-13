import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export type MenuSeparatorBaseProps = {}
export interface MenuSeparatorProps extends HTMLArkProps<'hr'>, MenuSeparatorBaseProps {}

export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getSeparatorProps(), props)

  return <ark.hr {...mergedProps} ref={ref} />
})

MenuSeparator.displayName = 'MenuSeparator'
