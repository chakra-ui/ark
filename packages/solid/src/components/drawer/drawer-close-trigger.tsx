import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DrawerCloseTriggerProps extends HTMLProps<'button'>, DrawerCloseTriggerBaseProps {}

export const DrawerCloseTrigger = (props: DrawerCloseTriggerProps) => {
  const context = useDrawerContext()
  const mergedProps = mergeProps(() => context().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
