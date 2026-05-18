import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DrawerCloseTriggerProps extends HTMLProps<'button'>, DrawerCloseTriggerBaseProps {}

export const DrawerCloseTrigger = (props: DrawerCloseTriggerProps) => {
  const context = useDrawerContext()
  const mergedProps = mergeProps(() => context().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
