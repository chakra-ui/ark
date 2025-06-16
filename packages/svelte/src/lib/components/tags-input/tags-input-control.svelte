<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TagsInputControlBaseProps extends PolymorphicProps<'div'> {}
  export interface TagsInputControlProps extends Assign<HTMLProps<'div'>, TagsInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'

  const props: TagsInputControlProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />
