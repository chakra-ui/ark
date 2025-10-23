<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSizerProps } from './use-sizer.svelte'

  export interface SizerRootBaseProps extends UseSizerProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SizerRootProps extends Assign<HTMLProps<'div'>, SizerRootBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { parts } from './sizer.anatomy'
  import { splitSizerProps } from './split-sizer-props.svelte'
  import { SizerProvider } from './use-sizer-context'
  import { useSizer } from './use-sizer.svelte'

  let { ref = $bindable(null), ...props }: SizerRootProps = $props()

  const [useSizerProps, localProps] = $derived(splitSizerProps(props))
  const sizer = useSizer(useSizerProps)

  function setRootNode(node: HTMLDivElement | null) {
    sizer().setRootRef(node)
  }

  SizerProvider(sizer)
</script>

<Ark as="div" bind:ref {@attach setRootNode} {...parts.root} {...localProps} />
