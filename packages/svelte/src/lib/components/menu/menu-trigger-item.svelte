<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuTriggerItemBaseProps extends PolymorphicProps<'div'> {}
  export interface MenuTriggerItemProps extends Assign<HTMLProps<'div'>, MenuTriggerItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

  const props: MenuTriggerItemProps = $props()

  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = $derived(mergeProps(getTriggerItemProps?.() ?? {}, props))
</script>

<Ark as="div" {...mergedProps} />
