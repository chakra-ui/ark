<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { CollectionItem } from '../collection'

  export interface SelectItemBaseProps<T extends CollectionItem = CollectionItem>
    extends PolymorphicProps<'div'>,
      RefAttribute {
    item: T
    disabled?: boolean
  }
  export interface SelectItemProps<T extends CollectionItem = CollectionItem>
    extends Assign<HTMLProps<'div'>, SelectItemBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context'
  import { SelectItemProvider } from './use-select-item-context'
  import { SelectItemPropsProvider } from './use-select-item-props-context'

  let { ref = $bindable(null), ...props }: SelectItemProps<T> = $props()

  const select = useSelectContext()
  const itemProps = $derived({ item: props.item, disabled: props.disabled })
  const mergedProps = $derived(mergeProps(select().getItemProps(itemProps), props))

  SelectItemProvider(() => select().getItemState(itemProps))
  SelectItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
