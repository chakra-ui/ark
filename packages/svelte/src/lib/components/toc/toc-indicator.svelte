<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types.ts'

  export interface TocIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TocIndicatorProps extends Assign<HTMLProps<'div'>, TocIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTocContext } from './use-toc-context.ts'

  let { ref = $bindable(null), ...props }: TocIndicatorProps = $props()
  const toc = useTocContext()
  const mergedProps = $derived(mergeProps(toc().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
