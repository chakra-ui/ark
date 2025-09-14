<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface BottomSheetGrabberIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface BottomSheetGrabberIndicatorProps
    extends Assign<HTMLProps<'div'>, BottomSheetGrabberIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  let { ref = $bindable(null), ...props }: BottomSheetGrabberIndicatorProps = $props()

  const bottomSheet = useBottomSheetContext()
  const mergedProps = $derived(mergeProps(bottomSheet().getGrabberIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
