<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface BottomSheetTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface BottomSheetTitleProps extends Assign<HTMLProps<'h2'>, BottomSheetTitleBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { mergeProps } from '@zag-js/svelte'
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  let { ref = $bindable(null), ...props }: BottomSheetTitleProps = $props()

  const bottomSheet = useBottomSheetContext()
  const mergedProps = $derived(mergeProps(bottomSheet().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
