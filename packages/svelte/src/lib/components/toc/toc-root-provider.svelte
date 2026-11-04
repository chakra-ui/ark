<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types.ts'
  import type { UseTocReturn } from './use-toc.svelte.ts'

  export interface TocRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseTocReturn
  }
  export interface TocRootProviderProps extends Assign<HTMLProps<'div'>, TocRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { TocProvider } from './use-toc-context.ts'

  let { ref = $bindable(null), value, ...props }: TocRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))
  TocProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
