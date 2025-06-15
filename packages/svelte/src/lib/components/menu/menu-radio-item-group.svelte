<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps } from '$lib/types'
  import type { UseMenuItemGroupContext } from './use-menu-item-group-context'

  type OptionalUseMenuItemGroupContext = Optional<ReturnType<UseMenuItemGroupContext>, 'id'>

  export interface MenuRadioItemGroupBaseProps extends OptionalUseMenuItemGroupContext, PolymorphicProps<'div'> {}
  export interface MenuRadioItemGroupProps extends Assign<HTMLProps<'div'>, MenuRadioItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useMenuContext } from './use-menu-context'
  import { MenuItemGroupProvider } from './use-menu-item-group-context'

  const props: MenuRadioItemGroupProps = $props()
  const id = $props.id()

  const [optionalItemGroupProps, localProps] = $derived(
    createSplitProps<OptionalUseMenuItemGroupContext>()(props, ['id', 'onValueChange', 'value']),
  )

  const menu = useMenuContext()
  const itemGroupProps = $derived({ id, ...optionalItemGroupProps })
  const mergedProps = $derived(mergeProps(menu().getItemGroupProps({ id: itemGroupProps.id }), localProps))

  MenuItemGroupProvider(() => itemGroupProps)
</script>

<Ark as="div" {...mergedProps} />
