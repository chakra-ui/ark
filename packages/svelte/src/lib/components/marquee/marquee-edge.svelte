<script module lang="ts">
  import type { EdgeProps } from '@zag-js/marquee'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MarqueeEdgeBaseProps extends EdgeProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MarqueeEdgeProps extends Assign<HTMLProps<'div'>, MarqueeEdgeBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useMarqueeContext } from './use-marquee-context'

  let { ref = $bindable(null), ...props }: MarqueeEdgeProps = $props()

  const [edgeProps, localProps] = $derived(createSplitProps<EdgeProps>()(props, ['side']))
  const marquee = useMarqueeContext()
  const mergedProps = $derived(mergeProps(marquee().getEdgeProps(edgeProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
