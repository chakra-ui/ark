<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { OptionItemProps } from '@zag-js/menu'

  type PartialOptionItemProps = Omit<OptionItemProps, 'type'>

  export interface MenuCheckboxItemBaseProps extends PartialOptionItemProps, PolymorphicProps<'div'> {}
  export interface MenuCheckboxItemProps extends Assign<HTMLProps<'div'>, MenuCheckboxItemBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'
  import { MenuItemProvider } from './use-menu-item-context'
  import { MenuItemPropsProvider } from './use-menu-option-item-props-context'

  let { checked = $bindable<boolean>(), ...props }: MenuCheckboxItemProps = $props()

  const [partialOptionItemProps, localProps] = $derived(
    // @ts-expect-error - TODO: fix this
    createSplitProps<PartialOptionItemProps>()(props, [
      'checked',
      'closeOnSelect',
      'disabled',
      'onCheckedChange',
      'value',
      'valueText',
    ]),
  )

  const optionItemProps = $derived<OptionItemProps>({
    ...partialOptionItemProps,
    type: 'checkbox',
    checked,
    onCheckedChange(nextChecked) {
      if (checked !== undefined) checked = nextChecked
      partialOptionItemProps.onCheckedChange?.(nextChecked)
    },
  })

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getOptionItemProps(optionItemProps), localProps))
  const optionItemState = $derived(menu().getOptionItemState(optionItemProps))

  MenuItemPropsProvider(() => optionItemProps)
  MenuItemProvider(() => optionItemState)
</script>

<Ark as="div" {...mergedProps} />
