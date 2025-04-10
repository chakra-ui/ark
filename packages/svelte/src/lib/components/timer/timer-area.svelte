<script lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTimerContext } from './use-timer-context'

  export interface TimerAreaBaseProps extends PolymorphicProps<'div'> {}
  export interface TimerAreaProps extends HTMLProps<'div'>, TimerAreaBaseProps {}

  const props: TimerAreaProps = $props()
  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getAreaProps(), props))
</script>

<Ark as="div" {...mergedProps} />
