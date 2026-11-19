<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types.ts'
  import type { ItemProps } from '@zag-js/toc'

  export interface TocItemBaseProps extends ItemProps, PolymorphicProps<'li'>, RefAttribute {}
  export interface TocItemProps extends Assign<HTMLProps<'li'>, TocItemBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTocContext } from './use-toc-context.ts'
  import { TocItemPropsProvider } from './use-toc-item-props-context.ts'

  let { ref = $bindable(null), ...props }: TocItemProps = $props()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['item']))
  const toc = useTocContext()
  const mergedProps = $derived(mergeProps(toc().getItemProps(itemProps), localProps))

  TocItemPropsProvider(() => itemProps)
</script>

<Ark as="li" bind:ref {...mergedProps} />
