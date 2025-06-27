<script module lang="ts">
  import type { ItemProps } from '@zag-js/listbox'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ListboxItemProps extends Assign<HTMLProps<'div'>, ListboxItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'
  import { ListboxItemProvider } from './use-listbox-item-context.js'
  import { ListboxItemPropsProvider } from './use-listbox-item-props-context.js'

  let { ref = $bindable(), ...props }: ListboxItemProps = $props()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['item', 'highlightOnHover']))
  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getItemProps(itemProps), localProps))
  const itemState = $derived(listbox().getItemState(itemProps))

  ListboxItemPropsProvider(() => itemProps)
  ListboxItemProvider(() => itemState)
</script>

<Ark as="div" bind:ref {...mergedProps} />
