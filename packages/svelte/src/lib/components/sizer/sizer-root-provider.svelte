<script module lang="ts">
  import type { Accessor, Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSizerReturn } from './use-sizer.svelte'

  export interface SizerRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: Accessor<UseSizerReturn>
  }
  export interface SizerRootProviderProps extends Assign<HTMLProps<'div'>, SizerRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { parts } from './sizer.anatomy'
  import { SizerProvider } from './use-sizer-context'

  let { ref = $bindable(null), value, ...props }: SizerRootProviderProps = $props()

  function setRootNode(node: HTMLDivElement | null) {
    value().setRootRef(node)
  }

  SizerProvider(value)
</script>

<Ark as="div" bind:ref {@attach setRootNode} {...parts.root} {...props} />
