<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListVirtualizerContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ListVirtualizerContentProps extends Assign<HTMLProps<'div'>, ListVirtualizerContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

  let { ref = $bindable(null), ...props }: ListVirtualizerContentProps = $props()

  const virtualizer = useListVirtualizerContext()
  const mergedProps = $derived(mergeProps({ style: virtualizer().getContentStyle() }, props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
