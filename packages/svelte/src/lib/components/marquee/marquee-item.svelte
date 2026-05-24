<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MarqueeItemBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MarqueeItemProps extends Assign<HTMLProps<'div'>, MarqueeItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMarqueeContext } from './use-marquee-context.ts'

  let { ref = $bindable(null), ...props }: MarqueeItemProps = $props()

  const marquee = useMarqueeContext()
  const mergedProps = $derived(mergeProps(marquee().getItemProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
