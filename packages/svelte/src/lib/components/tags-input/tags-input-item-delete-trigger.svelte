<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface TagsInputItemDeleteTriggerProps extends Assign<
    HTMLProps<'button'>,
    TagsInputItemDeleteTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTagsInputContext } from './use-tags-input-context.ts'
  import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputItemDeleteTriggerProps = $props()
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = $derived(mergeProps(tagsInput().getItemDeleteTriggerProps(itemProps()), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
