import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/timer'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TimerItemProps extends HTMLProps<'div'>, TimerItemBaseProps {}

export const TimerItem = forwardRef<HTMLDivElement, TimerItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['type'])
  const timer = useTimerContext()

  const mergedProps = mergeProps(timer.getItemProps(itemProps), localProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {timer.formattedTime[itemProps.type]}
    </ark.div>
  )
})

TimerItem.displayName = 'TimerItem'
