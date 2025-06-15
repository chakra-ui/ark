<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface MenuPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface MenuPositionerProps extends Assign<HTMLProps<'div'>, MenuPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useMenuContext } from './use-menu-context'

  const props: MenuPositionerProps = $props()

  const menu = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(menu().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} />
{/if}
