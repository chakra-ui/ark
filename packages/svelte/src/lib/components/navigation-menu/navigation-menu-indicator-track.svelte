<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NavigationMenuIndicatorTrackBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuIndicatorTrackProps extends Assign<HTMLProps<'div'>, NavigationMenuIndicatorTrackBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNavigationMenuContext } from './use-navigation-menu-context'

  let { ref = $bindable(null), ...props }: NavigationMenuIndicatorTrackProps = $props()

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getIndicatorTrackProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
