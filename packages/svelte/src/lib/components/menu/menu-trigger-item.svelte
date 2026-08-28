<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuTriggerItemBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuTriggerItemProps extends Assign<HTMLProps<'div'>, MenuTriggerItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useMenuTriggerItemContext } from './use-menu-trigger-item-context.ts'
  import { MenuItemPropsProvider } from './use-menu-option-item-props-context.ts'

  let { ref = $bindable(null), ...props }: MenuTriggerItemProps = $props()

  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = $derived(mergeProps(getTriggerItemProps?.() ?? {}, props))

  MenuItemPropsProvider(() => ({ value: mergedProps['data-value'] }))
</script>

<Ark as="div" bind:ref {...mergedProps} />
