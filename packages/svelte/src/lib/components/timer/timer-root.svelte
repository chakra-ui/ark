<script lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps } from '$lib/types'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { TimerProvider } from './use-timer-context'
  import type { UseTimerProps } from './use-timer.svelte'
  import { useTimer } from './use-timer.svelte'

  export interface TimerRootBaseProps extends Optional<UseTimerProps, 'id'>, PolymorphicProps<'div'> {}
  export interface TimerRootProps extends Assign<HTMLProps<'div'>, TimerRootBaseProps> {}

  const _props: TimerRootProps = $props()
  const providedId = $props.id()

  const [useTimerProps, localProps] = $derived(
    createSplitProps<Optional<UseTimerProps, 'id'>>()(_props, [
      'id',
      'ids',
      'autoStart',
      'interval',
      'countdown',
      'startMs',
      'targetMs',
      'onComplete',
      'onTick',
    ]),
  )

  const resolvedProps = $derived({
    ...useTimerProps,
    id: providedId,
  })

  const timer = useTimer(reflect(() => resolvedProps))
  const mergedProps = $derived(mergeProps(timer().getRootProps(), localProps))

  TimerProvider(timer)
</script>

<Ark as="div" {...mergedProps} />
