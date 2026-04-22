<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types'

  export interface TocLinkBaseProps extends PolymorphicProps<'a'>, RefAttribute {}
  export interface TocLinkProps extends Assign<HTMLProps<'a'>, TocLinkBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTocContext } from './use-toc-context'
  import { useTocItemPropsContext } from './use-toc-item-props-context'

  let { ref = $bindable(null), ...props }: TocLinkProps = $props()
  const toc = useTocContext()
  const itemProps = useTocItemPropsContext()
  const mergedProps = $derived(mergeProps(toc().getLinkProps(itemProps()), props))
</script>

<Ark as="a" bind:ref {...mergedProps} />
