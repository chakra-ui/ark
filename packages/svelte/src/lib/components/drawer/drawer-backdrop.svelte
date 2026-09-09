<script module lang="ts">
  import type { BackdropState } from '@zag-js/drawer'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerBackdropState extends BackdropState {}
  export interface DrawerBackdropBaseProps extends PolymorphicProps<'div', DrawerBackdropState>, RefAttribute {
    ref?: Element | null
  }
  export interface DrawerBackdropProps extends Assign<HTMLProps<'div'>, DrawerBackdropBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresence } from '../presence/index.ts'
  import { useDrawerContext } from './use-drawer-context.ts'

  let { ref = $bindable(null), ...props }: DrawerBackdropProps = $props()

  const drawer = useDrawerContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({ ...renderStrategyProps(), present: drawer().open }))
  const mergedProps = $derived(mergeProps(drawer().getBackdropProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} state={drawer().getBackdropState()} />
{/if}
