<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuContextTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface MenuContextTriggerProps extends Assign<HTMLProps<'button'>, MenuContextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useMenuContext } from './use-menu-context'

  const props: MenuContextTriggerProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getContextTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
