import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseMenubarReturn } from './use-menubar.ts'
import { MenubarProvider } from './use-menubar-context.ts'

interface RootProviderProps {
  value: UseMenubarReturn
}

export interface MenubarRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface MenubarRootProviderProps extends HTMLProps<'div'>, RootProviderProps, MenubarRootProviderBaseProps {}

export const MenubarRootProvider = (props: MenubarRootProviderProps) => {
  const [{ value: menubar }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => menubar().getRootProps(), localProps)

  return (
    <MenubarProvider value={menubar}>
      <ark.div {...mergedProps} />
    </MenubarProvider>
  )
}
