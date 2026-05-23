<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/cascade-select'

  export interface CascadeSelectItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CascadeSelectItemProps extends Assign<HTMLProps<'div'>, CascadeSelectItemBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '$lib/components/factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { useCascadeSelectContext } from './use-cascade-select-context'
  import { CascadeSelectItemProvider } from './use-cascade-select-item-context'
  import { CascadeSelectItemPropsProvider } from './use-cascade-select-item-props-context'

  let { ref = $bindable(null), ...props }: CascadeSelectItemProps = $props()
  const cascadeSelect = useCascadeSelectContext()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['item', 'indexPath', 'value']))
  const mergedProps = $derived(mergeProps(cascadeSelect().getItemProps(itemProps), localProps))

  CascadeSelectItemProvider(() => cascadeSelect().getItemState(itemProps))
  CascadeSelectItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
