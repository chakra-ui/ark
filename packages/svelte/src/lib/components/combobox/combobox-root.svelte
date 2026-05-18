<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from '../collection/index.ts'
  import type { UsePresenceProps } from '../presence/index.ts'
  import type { UseComboboxProps } from './use-combobox.svelte.ts'

  export interface ComboboxRootBaseProps<T extends CollectionItem>
    extends UseComboboxProps<T>, UsePresenceProps, PolymorphicProps<'div'>, RefAttribute {}

  export interface ComboboxRootProps<T extends CollectionItem> extends Assign<
    HTMLProps<'div'>,
    ComboboxRootBaseProps<T>
  > {}

  export type ComboboxRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
    ComboboxRootProps<T>,
    P
  >

  export type ComboboxRootComponent<P = {}> = <T extends CollectionItem>(
    props: ComboboxRootComponentProps<T, P>,
  ) => Snippet
</script>

<script lang="ts" generics="T extends CollectionItem">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.ts'
  import { ComboboxProvider } from './use-combobox-context.ts'
  import { useCombobox } from './use-combobox.svelte.ts'

  let {
    ref = $bindable(null),
    open = $bindable<boolean>(),
    value = $bindable<string[]>(),
    inputValue = $bindable<string>(),
    ...props
  }: ComboboxRootProps<T> = $props()

  const [presenceProps, comboboxProps] = $derived(splitPresenceProps(props))
  const [useComboboxProps, localProps] = $derived(
    createSplitProps<UseComboboxProps<T>>()(comboboxProps, [
      'allowCustomValue',
      'alwaysSubmitOnEnter',
      'autoFocus',
      'closeOnSelect',
      'collection',
      'composite',
      'defaultHighlightedValue',
      'defaultInputValue',
      'defaultOpen',
      'defaultValue',
      'disabled',
      'disableLayer',
      'form',
      'highlightedValue',
      'id',
      'ids',
      'inputBehavior',
      'inputValue',
      'invalid',
      'loopFocus',
      'multiple',
      'name',
      'navigate',
      'onFocusOutside',
      'onHighlightChange',
      'onInputValueChange',
      'onInteractOutside',
      'onOpenChange',
      'onPointerDownOutside',
      'onSelect',
      'onValueChange',
      'open',
      'openOnChange',
      'openOnClick',
      'openOnKeyPress',
      'placeholder',
      'positioning',
      'readOnly',
      'required',
      'scrollToIndexFn',
      'selectionBehavior',
      'translations',
      'value',
    ]),
  )

  const id = $props.id()

  const machineProps = $derived.by<UseComboboxProps<T>>(() => ({
    ...useComboboxProps,
    id: useComboboxProps.id ?? id,
    open,
    value,
    inputValue,
    onOpenChange(details) {
      useComboboxProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
    onValueChange(details) {
      useComboboxProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
    onInputValueChange(details) {
      useComboboxProps.onInputValueChange?.(details)
      if (inputValue !== undefined) inputValue = details.inputValue
    },
  }))

  const combobox = useCombobox(() => machineProps)
  const presence = usePresence(() => ({ present: combobox().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(combobox().getRootProps(), localProps))

  ComboboxProvider(combobox)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
