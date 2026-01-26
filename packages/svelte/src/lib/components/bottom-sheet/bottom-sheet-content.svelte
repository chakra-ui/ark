<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ContentProps } from '@zag-js/bottom-sheet'

  export interface BottomSheetContentBaseProps extends PolymorphicProps<'div'>, ContentProps, RefAttribute {
    ref?: Element | null
  }
  export interface BottomSheetContentProps extends Assign<
    Omit<HTMLProps<'div'>, 'draggable'>,
    BottomSheetContentBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { createSplitProps } from '../../utils/create-split-props'
  import { useBottomSheetContext } from './use-bottom-sheet-context'

  let { ref = $bindable(null), ...props }: BottomSheetContentProps = $props()

  const [contentProps, localProps] = $derived(createSplitProps<ContentProps>()(props, ['draggable']))
  const bottomSheet = useBottomSheetContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(
    mergeProps(
      bottomSheet().getContentProps({ draggable: true, ...contentProps }),
      presence().getPresenceProps(),
      localProps,
    ),
  )

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
