import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuSeparatorBaseProps extends PolymorphicProps<'hr'> {}
export interface MenuSeparatorProps
  extends JSX.HTMLAttributes<HTMLHRElement>,
    MenuSeparatorBaseProps {}

export const MenuSeparator = (props: MenuSeparatorProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu().getSeparatorProps(), props)

  return <ark.hr {...mergedProps} />
}
