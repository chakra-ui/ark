<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface TagsInputItemTextProps extends Assign<HTMLProps<'span'>, TagsInputItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTagsInputContext } from './use-tags-input-context.ts'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputItemTextProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
