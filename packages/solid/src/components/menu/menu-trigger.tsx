import type { TriggerProps, TriggerState } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuTriggerState extends TriggerState {}

export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps<'button', MenuTriggerState> {}
export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}

export const MenuTrigger = (props: MenuTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const api = useMenuContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getTriggerProps(triggerProps),
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    localProps,
  )
  return <ark.button {...mergedProps} state={api().getTriggerState(triggerProps)} />
}
