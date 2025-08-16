<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { Orientation } from '@zag-js/types'

  interface ScrollbarProps {
    orientation?: Orientation
  }

  export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaScrollbarProps extends Assign<HTMLProps<'div'>, ScrollAreaScrollbarBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useScrollAreaContext } from './use-scroll-area-context.js'

  let { ref = $bindable(null), ...props }: ScrollAreaScrollbarProps = $props()

  const [scrollbarProps, localProps] = $derived(
    createSplitProps<ScrollbarProps>()(props, ['orientation'])
  )

  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = $derived(mergeProps(scrollAreaApi().getScrollbarProps(scrollbarProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />