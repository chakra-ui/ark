<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputItemInputBaseProps extends PolymorphicProps<'input'> {}
  export interface TagsInputItemInputProps extends Assign<HTMLProps<'input'>, TagsInputItemInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

  const props: TagsInputItemInputProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemInputProps(itemProps()), props))
</script>

<Ark as="input" {...mergedProps} />
