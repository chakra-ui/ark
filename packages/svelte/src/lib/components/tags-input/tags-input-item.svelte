<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/tags-input'

  export interface TagsInputItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TagsInputItemProps extends Assign<HTMLProps<'div'>, TagsInputItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useTagsInputContext } from './use-tags-input-context.ts'
  import { TagsInputItemProvider } from './use-tags-input-item-context.ts'
  import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputItemProps = $props()
  const tagsInput = useTagsInputContext()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['index', 'disabled', 'value']))
  const mergedProps = $derived(mergeProps(tagsInput().getItemProps(itemProps), localProps))

  TagsInputItemProvider(() => tagsInput().getItemState(itemProps))
  TagsInputItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
