<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types'
  import type { UseTocReturn } from './use-toc.svelte'

  export interface TocRootProviderBaseProps extends PolymorphicProps<'nav'>, RefAttribute {
    value: UseTocReturn
  }
  export interface TocRootProviderProps extends Assign<HTMLProps<'nav'>, TocRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { TocProvider } from './use-toc-context'

  let { ref = $bindable(null), value, ...props }: TocRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))
  TocProvider(() => value())
</script>

<Ark as="nav" bind:ref {...mergedProps} />
