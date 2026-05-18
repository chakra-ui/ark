<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseMarqueeReturn } from './use-marquee.svelte.ts'

  interface RootProviderProps {
    value: UseMarqueeReturn
  }

  export interface MarqueeRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MarqueeRootProviderProps extends Assign<HTMLProps<'div'>, MarqueeRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { MarqueeProvider } from './use-marquee-context.ts'

  let { ref = $bindable(null), value, ...props }: MarqueeRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  MarqueeProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
