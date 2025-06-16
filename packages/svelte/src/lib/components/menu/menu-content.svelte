<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuContentProps extends Assign<HTMLProps<'div'>, MenuContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useMenuContext } from './use-menu-context'

  let { ref = $bindable<Element | null>(), ...props }: MenuContentProps = $props()

  const menu = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(menu().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement | null) {
    presence().setNode(node)
    ref = node
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" {@attach setNode} {...mergedProps} />
{/if}
