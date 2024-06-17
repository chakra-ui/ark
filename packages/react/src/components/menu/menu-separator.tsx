import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuSeparatorBaseProps extends PolymorphicProps {}
export interface MenuSeparatorProps extends HTMLAttributes<HTMLHRElement>, MenuSeparatorBaseProps {}

export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getSeparatorProps(), props)

  return <ark.hr {...mergedProps} ref={ref} />
})

MenuSeparator.displayName = 'MenuSeparator'
