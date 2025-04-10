<script lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { TimerProvider } from './use-timer-context'
  import type { UseTimerReturn } from './use-timer.svelte'

  interface RootProviderProps {
    value: UseTimerReturn
  }

  export interface TimerRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
  export interface TimerRootProviderProps extends HTMLProps<'div'>, TimerRootProviderBaseProps {}

  const props: TimerRootProviderProps = $props()
  const { value: timer, ...localProps } = props
  const mergedProps = $derived(mergeProps(timer().getRootProps(), localProps))

  TimerProvider(timer)
</script>

<Ark as="div" {...mergedProps} />
