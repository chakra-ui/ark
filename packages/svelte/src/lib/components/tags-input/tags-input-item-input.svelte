<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputItemInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface TagsInputItemInputProps extends Assign<HTMLProps<'input'>, TagsInputItemInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTagsInputContext } from './use-tags-input-context.ts'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputItemInputProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemInputProps(itemProps()), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
