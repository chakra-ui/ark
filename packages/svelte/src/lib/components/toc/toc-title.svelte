<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types.ts'

  export interface TocTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface TocTitleProps extends Assign<HTMLProps<'h2'>, TocTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTocContext } from './use-toc-context.ts'

  let { ref = $bindable(null), ...props }: TocTitleProps = $props()
  const toc = useTocContext()
  const mergedProps = $derived(mergeProps(toc().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
