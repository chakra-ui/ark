<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types.ts'

  export interface TocListBaseProps extends PolymorphicProps<'ul'>, RefAttribute {}
  export interface TocListProps extends Assign<HTMLProps<'ul'>, TocListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTocContext } from './use-toc-context.ts'

  let { ref = $bindable(null), ...props }: TocListProps = $props()
  const toc = useTocContext()
  const mergedProps = $derived(mergeProps(toc().getListProps(), props))
</script>

<Ark as="ul" bind:ref {...mergedProps} />
