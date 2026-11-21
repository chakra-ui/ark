<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemGroupProps } from '@zag-js/combobox'

  export interface CommandItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps<'div'>, RefAttribute {}
  export interface CommandItemGroupProps extends Assign<HTMLProps<'div'>, CommandItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'
  import { CommandItemGroupPropsProvider } from './use-command-item-group-props-context.ts'

  let { ref = $bindable(null), ...props }: CommandItemGroupProps = $props()
  const providedId = $props.id()

  const [itemGroupProps, localProps] = $derived(createSplitProps<Partial<ItemGroupProps>>()(props, ['id']))

  const groupProps = $derived({ ...itemGroupProps, id: itemGroupProps.id ?? providedId })

  const command = useCommandContext()
  const mergedProps = $derived(
    mergeProps(command().getItemGroupProps(groupProps), parts.itemGroup.attrs(''), localProps),
  )

  CommandItemGroupPropsProvider(() => groupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
