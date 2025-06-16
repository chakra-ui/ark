<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputClearTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface TagsInputClearTriggerProps extends Assign<HTMLProps<'button'>, TagsInputClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'

  const props: TagsInputClearTriggerProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getClearTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
