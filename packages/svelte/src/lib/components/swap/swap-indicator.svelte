<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SwapIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    type: 'on' | 'off'
  }
  export interface SwapIndicatorProps extends Assign<HTMLProps<'span'>, SwapIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSwapContext } from './use-swap-context'

  let { ref = $bindable(null), type, children, ...props }: SwapIndicatorProps = $props()

  const swap = useSwapContext()
  const presence = $derived(type === 'on' ? swap().onPresence() : swap().offPresence())
  const mergedProps = $derived(mergeProps(swap().getIndicatorProps({ type }), props))

  function setNode(node: Element | null) {
    presence.setNode(node)
  }
</script>

{#if !presence.unmounted}
  <Ark as="span" bind:ref {...mergedProps} {@attach setNode}>
    {@render children?.()}
  </Ark>
{/if}
