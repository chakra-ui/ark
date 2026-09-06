<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface WindowVirtualizerContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface WindowVirtualizerContentProps extends Assign<HTMLProps<'div'>, WindowVirtualizerContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

  let { ref = $bindable(null), ...props }: WindowVirtualizerContentProps = $props()

  const virtualizer = useWindowVirtualizerContext()
  const mergedProps = $derived(mergeProps({ style: virtualizer().getContentStyle() }, props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
