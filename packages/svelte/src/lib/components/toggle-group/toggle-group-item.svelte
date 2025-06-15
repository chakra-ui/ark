<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { ItemProps } from '@zag-js/toggle-group'

  export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps<'button'> {}
  export interface ToggleGroupItemProps extends Assign<HTMLProps<'button'>, ToggleGroupItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { useToggleGroupContext } from './use-toggle-group-context'

  const props: ToggleGroupItemProps = $props()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['value', 'disabled']))

  const toggleGroup = useToggleGroupContext()
  const mergedProps = $derived(mergeProps(toggleGroup().getItemProps(itemProps), localProps))
</script>

<Ark as="button" {...mergedProps} />
