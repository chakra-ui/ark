<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types'

  export interface TocIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TocIndicatorProps extends Assign<HTMLProps<'div'>, TocIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTocContext } from './use-toc-context'

  let { ref = $bindable(null), ...props }: TocIndicatorProps = $props()
  const toc = useTocContext()
  const mergedProps = $derived(mergeProps(toc().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
