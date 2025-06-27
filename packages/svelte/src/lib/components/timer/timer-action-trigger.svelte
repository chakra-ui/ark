<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import type { ActionTriggerProps } from '@zag-js/timer'
  import { Ark } from '../factory'
  import { useTimerContext } from './use-timer-context'

  export interface TimerActionTriggerBaseProps extends ActionTriggerProps, PolymorphicProps<'button'>, RefAttribute {}

  export interface TimerActionTriggerProps extends HTMLProps<'button'>, TimerActionTriggerBaseProps {}

  let { ref = $bindable(null), ...props }: TimerActionTriggerProps = $props()

  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getActionTriggerProps(props), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
