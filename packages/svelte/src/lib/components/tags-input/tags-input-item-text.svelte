<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputItemTextBaseProps extends PolymorphicProps<'span'> {}
  export interface TagsInputItemTextProps extends Assign<HTMLProps<'span'>, TagsInputItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

  const props: TagsInputItemTextProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" {...mergedProps} />
