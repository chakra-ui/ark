import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuSeparatorProps extends HTMLArkProps<'hr'> {}

export const MenuSeparator: ArkComponent<'hr'> = (props: MenuSeparatorProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu?.().separatorProps, props)

  return <ark.hr {...mergedProps} />
}
