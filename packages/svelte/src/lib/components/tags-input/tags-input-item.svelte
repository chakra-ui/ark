<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputItemBaseProps extends PolymorphicProps<'div'> {
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

  const props: TagsInputItemProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = $derived({ index: props.index, value: props.value, disabled: props.disabled })
  const mergedProps = $derived(mergeProps(tagsInput().getItemProps(itemProps), props))

  TagsInputItemProvider(() => ({ index: props.index, value: props.value }))
  TagsInputItemPropsProvider(() => itemProps)
</script>

<Ark as="div" {...mergedProps} />
