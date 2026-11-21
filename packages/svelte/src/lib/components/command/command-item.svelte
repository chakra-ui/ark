<script module lang="ts">
  import type { ItemState } from '@zag-js/combobox'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CommandItemState extends ItemState {}
  export interface CommandItemBaseProps extends PolymorphicProps<'div', CommandItemState>, RefAttribute {
    /**
     * The item to render
     */
    item: unknown
    /**
     * Whether hovering outside should keep the item highlighted
     * @default true
     */
    persistFocus?: boolean | undefined
  }
  export interface CommandItemProps extends Assign<HTMLProps<'div'>, CommandItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory/index.ts'
  import { parts } from './command.anatomy.ts'
  import { useCommandContext } from './use-command-context.ts'
  import { CommandItemProvider } from './use-command-item-context.ts'
  import { CommandItemPropsProvider } from './use-command-item-props-context.ts'

  let { ref = $bindable(null), ...props }: CommandItemProps = $props()

  const [splitItemProps, localProps] = $derived(
    createSplitProps<{ item: any; persistFocus?: boolean | undefined }>()(props, ['item', 'persistFocus']),
  )
  const itemProps = $derived({ persistFocus: true, ...splitItemProps })

  const command = useCommandContext()
  const itemState = $derived(command().getItemState(itemProps))
  const mergedProps = $derived(
    mergeProps(
      command().getItemProps(itemProps),
      parts.item.attrs(''),
      { hidden: !command().collection.has(itemState.value) },
      localProps,
    ),
  )

  CommandItemProvider(() => itemState)
  CommandItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} state={itemState} />
