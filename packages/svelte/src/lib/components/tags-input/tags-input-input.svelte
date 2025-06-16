<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputInputBaseProps extends PolymorphicProps<'input'> {}
  export interface TagsInputInputProps extends Assign<HTMLProps<'input'>, TagsInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'

  const props: TagsInputInputProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getInputProps(), props))
</script>

<Ark as="input" {...mergedProps} />
