import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuContextTriggerProps extends HTMLArkProps<'button'> {}

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().contextTriggerProps, props)

  return <ark.button {...mergedProps} />
}
