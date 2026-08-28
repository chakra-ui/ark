<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { UseScrollAreaContext } from './use-scroll-area-context.js'

  export interface ScrollAreaRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseScrollAreaContext
  }
  export interface ScrollAreaRootProviderProps extends Assign<HTMLProps<'div'>, ScrollAreaRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { ScrollAreaProvider } from './use-scroll-area-context.js'

  let { value, ref = $bindable(null), ...props }: ScrollAreaRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  ScrollAreaProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
