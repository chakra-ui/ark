<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseMarqueeReturn } from './use-marquee.svelte'

  interface RootProviderProps {
    value: UseMarqueeReturn
  }

  export interface MarqueeRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MarqueeRootProviderProps extends Assign<HTMLProps<'div'>, MarqueeRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { MarqueeProvider } from './use-marquee-context'

  let { ref = $bindable(null), ...props }: MarqueeRootProviderProps = $props()
  const { value: marquee, ...localProps } = props
  const mergedProps = $derived(mergeProps(marquee().getRootProps(), localProps))

  MarqueeProvider(marquee)
</script>

<Ark as="div" bind:ref {...mergedProps} />
