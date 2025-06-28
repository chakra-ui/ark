<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { CollectionItem } from '../collection'
  import type { UseSelectProps } from './use-select.svelte'

  export interface SelectRootBaseProps<T extends CollectionItem = CollectionItem>
    extends UseSelectProps<T>,
      UsePresenceProps,
      PolymorphicProps<'div'>,
      RefAttribute {}

  export interface SelectRootProps<T extends CollectionItem = CollectionItem>
    extends Assign<HTMLProps<'div'>, SelectRootBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { Ark } from '$lib/components/factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'
  import { SelectProvider } from './use-select-context'
  import { useSelect } from './use-select.svelte'

  let { ref = $bindable(null), value = $bindable<string[] | undefined>(), ...props }: SelectRootProps<T> = $props()

  const [presenceProps, selectProps] = $derived(splitPresenceProps(props))
  const [useSelectProps, localProps] = $derived(
    createSplitProps<UseSelectProps<T>>()(selectProps, [
      'closeOnSelect',
      'collection',
      'composite',
      'defaultHighlightedValue',
      'defaultOpen',
      'defaultValue',
      'deselectable',
      'disabled',
      'form',
      'highlightedValue',
      'id',
      'ids',
      'invalid',
      'loopFocus',
      'multiple',
      'name',
      'onFocusOutside',
      'onHighlightChange',
      'onInteractOutside',
      'onOpenChange',
      'onPointerDownOutside',
      'onSelect',
      'onValueChange',
      'open',
      'positioning',
      'readOnly',
      'required',
      'scrollToIndexFn',
      'value',
    ]),
  )

  const providedId = $props.id()
  const machineProps = $derived.by<UseSelectProps<T>>(() => ({
    ...useSelectProps,
    id: props.id ?? providedId,
    value,
    onValueChange(details) {
      useSelectProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  }))

  const select = useSelect(() => machineProps)
  const presence = usePresence(() => ({ present: select().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(select().getRootProps(), localProps))

  SelectProvider(select)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
