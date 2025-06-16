<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputItemPreviewBaseProps extends PolymorphicProps<'div'> {}
  export interface TagsInputItemPreviewProps extends Assign<HTMLProps<'div'>, TagsInputItemPreviewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

  const props: TagsInputItemPreviewProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemPreviewProps(itemProps()), props))
</script>

<Ark as="div" {...mergedProps} />
