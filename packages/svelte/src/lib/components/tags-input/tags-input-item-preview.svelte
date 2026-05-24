<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputItemPreviewBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TagsInputItemPreviewProps extends Assign<HTMLProps<'div'>, TagsInputItemPreviewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTagsInputContext } from './use-tags-input-context.ts'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputItemPreviewProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemPreviewProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
