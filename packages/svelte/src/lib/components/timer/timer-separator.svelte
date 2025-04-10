<script lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTimerContext } from './use-timer-context'

  export interface TimerSeparatorBaseProps extends PolymorphicProps<'div'> {}
  export interface TimerSeparatorProps extends HTMLProps<'div'>, TimerSeparatorBaseProps {}

  const props: TimerSeparatorProps = $props()
  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getSeparatorProps(), props))
</script>

<Ark as="div" {...mergedProps} />
