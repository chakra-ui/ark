<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface BottomSheetCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface BottomSheetCloseTriggerProps extends Assign<HTMLProps<'button'>, BottomSheetCloseTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  let { ref = $bindable(null), ...props }: BottomSheetCloseTriggerProps = $props()

  const bottomSheet = useBottomSheetContext()
  const mergedProps = $derived(mergeProps(bottomSheet().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
