import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/timer'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface TimerItemProps extends HTMLProps<'div'>, TimerItemBaseProps {}

export const TimerItem = (props: TimerItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['type'])
  const timer = useTimerContext()

  const mergedProps = mergeProps(() => timer().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps}>{timer().formattedTime[itemProps.type]}</ark.div>
}
