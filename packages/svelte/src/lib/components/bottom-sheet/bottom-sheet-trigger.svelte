<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface BottomSheetTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface BottomSheetTriggerProps extends Assign<HTMLProps<'button'>, BottomSheetTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  let { ref = $bindable(null), ...props }: BottomSheetTriggerProps = $props()

  const bottomSheet = useBottomSheetContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(
    mergeProps(
      {
        ...bottomSheet().getTriggerProps(),
        'aria-controls': presence().unmounted ? undefined : bottomSheet().getTriggerProps()['aria-controls'],
      },
      props,
    ),
  )
</script>

<Ark as="button" bind:ref {...mergedProps} />
