import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-props-context'

export interface MenuItemTextBaseProps extends PolymorphicProps<'div'> {}
export interface MenuItemTextProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    MenuItemTextBaseProps {}

export const MenuItemText = (props: MenuItemTextProps) => {
  const context = useMenuContext()
  const optionItemProps = useMenuOptionItemPropsContext()
  const mergedProps = mergeProps(() => context().getItemTextProps(optionItemProps), props)

  return <ark.div {...mergedProps} />
}
