<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface GridVirtualizerContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface GridVirtualizerContentProps extends Assign<HTMLProps<'div'>, GridVirtualizerContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

  let { ref = $bindable(null), ...props }: GridVirtualizerContentProps = $props()

  const virtualizer = useGridVirtualizerContext()
  const mergedProps = $derived(mergeProps({ style: virtualizer().getContentStyle() }, props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
