<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface TagsInputLabelProps extends Assign<HTMLProps<'label'>, TagsInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'

  let { ref = $bindable(), ...props }: TagsInputLabelProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
