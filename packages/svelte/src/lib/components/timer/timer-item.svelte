<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import type { ItemProps } from '@zag-js/timer'
  import { Ark } from '../factory'
  import { useTimerContext } from './use-timer-context'

  export interface TimerItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TimerItemProps extends HTMLProps<'div'>, TimerItemBaseProps {}

  let { ref = $bindable(), ...props }: TimerItemProps = $props()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['type']))

  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getItemProps(itemProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {#if mergedProps.children}
    {@render mergedProps.children?.()}
  {:else}
    {timer().formattedTime[itemProps.type]}
  {/if}
</Ark>
