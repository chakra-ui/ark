import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export interface MenuSeparatorProps extends HTMLArkProps<'hr'> {}

export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.separatorProps ?? {}, props)

  return <ark.hr {...mergedProps} ref={ref} />
})

MenuSeparator.displayName = 'MenuSeparator'
