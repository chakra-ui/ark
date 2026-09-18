<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/cascade-select'

  export interface CascadeSelectListBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CascadeSelectListProps extends Assign<HTMLProps<'div'>, CascadeSelectListBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'

  let { ref = $bindable(null), ...props }: CascadeSelectListProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['item', 'indexPath', 'value']))
  const mergedProps = $derived(mergeProps(cascadeSelect().getListProps(itemProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
