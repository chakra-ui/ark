import type { TriggerProps, TriggerState } from '@zag-js/drawer'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerTriggerState extends TriggerState {}

export interface DrawerTriggerBaseProps extends TriggerProps, PolymorphicProps<'button', DrawerTriggerState> {}
export interface DrawerTriggerProps extends Assign<HTMLProps<'button'>, DrawerTriggerBaseProps> {}

export const DrawerTrigger = (props: DrawerTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    () => drawer().getTriggerProps(triggerProps),
    () => ({ 'aria-controls': presence().unmounted && null }),
    localProps,
  )

  return <ark.button {...mergedProps} state={drawer().getTriggerState(triggerProps)} />
}
