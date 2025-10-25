<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MarqueeViewportBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MarqueeViewportProps extends Assign<HTMLProps<'div'>, MarqueeViewportBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMarqueeContext } from './use-marquee-context'

  let { ref = $bindable(null), ...props }: MarqueeViewportProps = $props()

  const marquee = useMarqueeContext()
  const mergedProps = $derived(mergeProps(marquee().getViewportProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
