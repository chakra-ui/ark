<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseTagsInputReturn } from './use-tags-input.svelte'

  export interface TagsInputRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseTagsInputReturn
  }
  export interface TagsInputRootProviderProps extends Assign<HTMLProps<'div'>, TagsInputRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { TagsInputProvider } from './use-tags-input-context'

  const { value, ...props }: TagsInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  TagsInputProvider(value)
</script>

<Ark as="div" {...mergedProps} />
