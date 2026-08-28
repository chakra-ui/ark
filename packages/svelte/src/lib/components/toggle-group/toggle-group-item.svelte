<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/toggle-group'

  export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface ToggleGroupItemProps extends Assign<HTMLProps<'button'>, ToggleGroupItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory/index.ts'
  import { useToggleGroupContext } from './use-toggle-group-context.ts'

  let { ref = $bindable(null), ...props }: ToggleGroupItemProps = $props()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['value', 'disabled']))

  const toggleGroup = useToggleGroupContext()
  const mergedProps = $derived(mergeProps(toggleGroup().getItemProps(itemProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
