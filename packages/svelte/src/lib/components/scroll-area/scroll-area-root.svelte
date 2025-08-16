<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { UseScrollAreaProps } from './use-scroll-area.svelte'

  export interface ScrollAreaRootBaseProps extends UseScrollAreaProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaRootProps extends Assign<HTMLProps<'div'>, ScrollAreaRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { ScrollAreaProvider } from './use-scroll-area-context.js'
  import { useScrollArea } from './use-scroll-area.svelte.js'

  let { ref = $bindable(null), ...props }: ScrollAreaRootProps = $props()
  const providedId = $props.id()

  const [scrollAreaProps, localProps] = $derived(createSplitProps<UseScrollAreaProps>()(props, ['id', 'ids']))

  const resolvedProps = $derived<UseScrollAreaProps>({
    ...scrollAreaProps,
    id: scrollAreaProps.id ?? providedId,
  })

  const scrollArea = useScrollArea(() => resolvedProps)
  const mergedProps = $derived(mergeProps(scrollArea().getRootProps(), localProps))

  ScrollAreaProvider(scrollArea)
</script>

<Ark as="div" bind:ref {...mergedProps} />
