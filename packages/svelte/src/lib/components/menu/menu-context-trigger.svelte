<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { TriggerProps } from '@zag-js/menu'

  export interface MenuContextTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface MenuContextTriggerProps extends Assign<HTMLProps<'button'>, MenuContextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'

  let { ref = $bindable(null), ...props }: MenuContextTriggerProps = $props()
  const [contextTriggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getContextTriggerProps(contextTriggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
