<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { OptionItemProps } from '@zag-js/menu'

  type PartialOptionItemProps = Omit<OptionItemProps, 'type' | 'checked' | 'onCheckedChange'>

  export interface MenuRadioItemBaseProps extends PartialOptionItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuRadioItemProps extends Assign<HTMLProps<'div'>, MenuRadioItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useMenuContext } from './use-menu-context'
  import { MenuItemProvider } from './use-menu-item-context'
  import { useMenuItemGroupContext } from './use-menu-item-group-context'
  import { MenuItemPropsProvider } from './use-menu-option-item-props-context'

  let { ref = $bindable(), ...props }: MenuRadioItemProps = $props()

  const [partialItemProps, localProps] = $derived(
    createSplitProps<PartialOptionItemProps>()(props, ['closeOnSelect', 'disabled', 'value', 'valueText']),
  )

  const menu = useMenuContext()
  const itemGroup = useMenuItemGroupContext()

  const optionItemProps: OptionItemProps = $derived({
    ...partialItemProps,
    checked: itemGroup().value === partialItemProps.value,
    type: 'radio',
    onCheckedChange: () => itemGroup().onValueChange?.({ value: partialItemProps.value }),
  })

  const mergedProps = $derived(mergeProps(menu().getOptionItemProps(optionItemProps), localProps))
  const optionItemState = $derived(menu().getOptionItemState(optionItemProps))

  MenuItemPropsProvider(() => optionItemProps)
  MenuItemProvider(() => optionItemState)
</script>

<Ark as="div" bind:ref {...mergedProps} />
