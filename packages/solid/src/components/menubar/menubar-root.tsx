import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseMenubarProps, useMenubar } from './use-menubar.ts'
import { MenubarProvider } from './use-menubar-context.ts'

export interface MenubarRootBaseProps extends UseMenubarProps, PolymorphicProps<'div'> {}
export interface MenubarRootProps extends HTMLProps<'div'>, MenubarRootBaseProps {}

export const MenubarRoot = (props: MenubarRootProps) => {
  const [useMenubarProps, localProps] = createSplitProps<UseMenubarProps>()(props, [
    'disabled',
    'id',
    'ids',
    'loopFocus',
    'orientation',
  ])

  const context = useMenubar(useMenubarProps)
  const mergedProps = mergeProps(() => context().getRootProps(), localProps)

  return (
    <MenubarProvider value={context}>
      <ark.div {...mergedProps} />
    </MenubarProvider>
  )
}
