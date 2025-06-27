<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TagsInputControlProps extends Assign<HTMLProps<'div'>, TagsInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTagsInputContext } from './use-tags-input-context'

  let { ref = $bindable(), ...props }: TagsInputControlProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
