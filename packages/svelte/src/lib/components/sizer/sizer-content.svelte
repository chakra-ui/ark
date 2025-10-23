<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SizerContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SizerContentProps extends Assign<HTMLProps<'div'>, SizerContentBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { parts } from './sizer.anatomy'
  import { useSizerContext } from './use-sizer-context'

  let { ref = $bindable(null), ...props }: SizerContentProps = $props()

  const sizer = useSizerContext()

  function setContentNode(node: HTMLDivElement | null) {
    sizer().setContentRef(node)
  }
</script>

<Ark as="div" bind:ref {@attach setContentNode} {...parts.content} {...props} />
