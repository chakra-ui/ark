<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface TagsInputLabelProps extends Assign<HTMLProps<'label'>, TagsInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'

  const props: TagsInputLabelProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
