import { mergeProps } from '@zag-js/solid'
import type { TriggerProps } from '@zag-js/drawer'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
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

  return <ark.button {...mergedProps} />
}
