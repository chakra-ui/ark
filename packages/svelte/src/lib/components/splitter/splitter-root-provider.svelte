<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSplitterReturn } from './use-splitter.svelte'

  export interface SplitterRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseSplitterReturn
  }
  export interface SplitterRootProviderProps extends Assign<HTMLProps<'div'>, SplitterRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { SplitterProvider } from './use-splitter-context'

  let { ref = $bindable(null), value, ...props }: SplitterRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  SplitterProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />
