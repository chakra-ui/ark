<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputItemBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    index: number
    value: string
    disabled?: boolean
  }
  export interface TagsInputItemProps extends Assign<HTMLProps<'div'>, TagsInputItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'
  import { TagsInputItemProvider } from './use-tags-input-item-context'
  import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context'

  let { ref = $bindable(null), index, value, disabled, ...restProps }: TagsInputItemProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = $derived({ index, value, disabled })
  const mergedProps = $derived(mergeProps(tagsInput().getItemProps(itemProps), restProps))

  TagsInputItemProvider(() => ({ index, value }))
  TagsInputItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
