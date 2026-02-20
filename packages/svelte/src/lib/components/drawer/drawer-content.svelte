<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ContentProps } from '@zag-js/drawer'

  export interface DrawerContentBaseProps extends PolymorphicProps<'div'>, ContentProps, RefAttribute {
    ref?: Element | null
  }
  export interface DrawerContentProps extends Assign<
    Omit<HTMLProps<'div'>, 'draggable'>,
    DrawerContentBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { createSplitProps } from '../../utils/create-split-props'
  import { useDrawerContext } from './use-drawer-context'

  let { ref = $bindable(null), ...props }: DrawerContentProps = $props()

  const [contentProps, localProps] = $derived(createSplitProps<ContentProps>()(props, ['draggable']))
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(
    mergeProps(
      drawer().getContentProps({ draggable: true, ...contentProps }),
      presence().getPresenceProps(),
      localProps,
    ),
  )

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
