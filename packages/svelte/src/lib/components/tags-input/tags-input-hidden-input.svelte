<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface TagsInputHiddenInputProps extends Assign<HTMLProps<'input'>, TagsInputHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'

  let { ref = $bindable(null), ...props }: TagsInputHiddenInputProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
