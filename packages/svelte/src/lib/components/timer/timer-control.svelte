<script lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTimerContext } from './use-timer-context'

  export interface TimerControlBaseProps extends PolymorphicProps<'div'> {}
  export interface TimerControlProps extends HTMLProps<'div'>, TimerControlBaseProps {}

  const props: TimerControlProps = $props()
  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />
