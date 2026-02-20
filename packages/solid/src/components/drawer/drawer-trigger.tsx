import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { usePresenceContext } from '../presence'

export interface DrawerTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DrawerTriggerProps extends HTMLProps<'button'>, DrawerTriggerBaseProps {}

export const DrawerTrigger = (props: DrawerTriggerProps) => {
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    () => drawer().getTriggerProps(),
    () => ({ 'aria-controls': presence().unmounted && null }),
    props,
  )

  return <ark.button {...mergedProps} />
}
