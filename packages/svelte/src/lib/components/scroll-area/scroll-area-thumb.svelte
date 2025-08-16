<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ScrollAreaThumbBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaThumbProps extends Assign<HTMLProps<'div'>, ScrollAreaThumbBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useScrollAreaContext } from './use-scroll-area-context.js'
  import { useScrollAreaScrollbarContext } from './use-scroll-area-scrollbar-context.js'

  let { ref = $bindable(null), ...props }: ScrollAreaThumbProps = $props()

  const scrollAreaApi = useScrollAreaContext()
  const scrollbarProps = useScrollAreaScrollbarContext()

  const mergedProps = $derived(mergeProps(scrollAreaApi().getThumbProps(scrollbarProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
