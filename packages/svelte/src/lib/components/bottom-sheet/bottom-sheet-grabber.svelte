<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface BottomSheetGrabberBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface BottomSheetGrabberProps extends Assign<HTMLProps<'div'>, BottomSheetGrabberBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  let { ref = $bindable(null), ...props }: BottomSheetGrabberProps = $props()

  const bottomSheet = useBottomSheetContext()
  const mergedProps = $derived(mergeProps(bottomSheet().getGrabberProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
