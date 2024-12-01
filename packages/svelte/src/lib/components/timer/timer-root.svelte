<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { TimerProvider } from './use-timer-context'
  import type { UseTimerProps } from './use-timer.svelte'
  import { useTimer } from './use-timer.svelte'

  export interface TimerRootBaseProps extends UseTimerProps, PolymorphicProps<'div'> {}
  export interface TimerRootProps extends Assign<HTMLProps<'div'>, TimerRootBaseProps> {}

  const props: TimerRootProps = $props()
  const [useTimerProps, localProps] = createSplitProps<UseTimerProps>()(props, [
    'id',
    'ids',
    'autoStart',
    'interval',
    'countdown',
    'startMs',
    'targetMs',
    'onComplete',
    'onTick',
  ])

  const timer = useTimer(useTimerProps)
  const mergedProps = $derived(mergeProps(timer().getRootProps(), localProps))

  TimerProvider(timer)
</script>

<Ark as="div" {...mergedProps} />
