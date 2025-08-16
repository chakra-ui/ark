<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { Orientation } from '@zag-js/types'

  interface ThumbProps {
    orientation?: Orientation
  }

  export interface ScrollAreaThumbBaseProps extends ThumbProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaThumbProps extends Assign<HTMLProps<'div'>, ScrollAreaThumbBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useScrollAreaContext } from './use-scroll-area-context.js'

  let { ref = $bindable(null), ...props }: ScrollAreaThumbProps = $props()

  const [thumbProps, localProps] = $derived(
    createSplitProps<ThumbProps>()(props, ['orientation'])
  )

  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = $derived(mergeProps(scrollAreaApi().getThumbProps(thumbProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />