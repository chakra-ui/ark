<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseCollapsibleReturn } from './use-collapsible.svelte'

  interface RootProviderProps {
    value: UseCollapsibleReturn
  }

  export interface CollapsibleRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CollapsibleRootProviderProps extends Assign<HTMLProps<'div'>, CollapsibleRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { CollapsibleProvider } from './use-collapsible-context'

  let { ref = $bindable(), value, ...props }: CollapsibleRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  CollapsibleProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />
