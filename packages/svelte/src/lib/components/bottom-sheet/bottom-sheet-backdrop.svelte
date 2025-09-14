<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface BottomSheetBackdropBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    ref?: Element | null
  }
  export interface BottomSheetBackdropProps extends Assign<HTMLProps<'div'>, BottomSheetBackdropBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresence } from '../presence'
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  let { ref = $bindable(null), ...props }: BottomSheetBackdropProps = $props()

  const bottomSheet = useBottomSheetContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({ ...renderStrategyProps, present: bottomSheet().open }))
  const mergedProps = $derived(mergeProps(bottomSheet().getBackdropProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
