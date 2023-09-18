import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuPositionerProps = HTMLArkProps<'div'>

export const MenuPositioner = (props: MenuPositionerProps) => {
  const menu = useMenuContext()
  const positionerProps = mergeProps(() => menu?.().positionerProps, props)
  return <ark.div {...positionerProps} />
}
