<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface TagsInputItemDeleteTriggerProps
    extends Assign<HTMLProps<'button'>, TagsInputItemDeleteTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

  const props: TagsInputItemDeleteTriggerProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemDeleteTriggerProps(itemProps()), props))
</script>

<Ark as="button" {...mergedProps} />
