<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTimerContext } from './use-timer-context'

  export interface TimerSeparatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TimerSeparatorProps extends HTMLProps<'div'>, TimerSeparatorBaseProps {}

  let { ref = $bindable(), ...props }: TimerSeparatorProps = $props()
  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getSeparatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
