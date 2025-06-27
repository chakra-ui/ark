<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { CollectionItem } from '../collection'
  import type { UsePresenceProps } from '../presence'
  import type { UseComboboxProps } from './use-combobox.svelte'

  export interface ComboboxRootBaseProps<T extends CollectionItem>
    extends UseComboboxProps<T>,
      UsePresenceProps,
      PolymorphicProps<'div'>,
      RefAttribute {}

  export interface ComboboxRootProps<T extends CollectionItem>
    extends Assign<HTMLProps<'div'>, ComboboxRootBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence'
  import { ComboboxProvider } from './use-combobox-context'
  import { useCombobox } from './use-combobox.svelte'

  let {
    ref = $bindable(),
    open = $bindable<boolean>(),
    value = $bindable<string[]>(),
    inputValue = $bindable<string>(),
    ...props
  }: ComboboxRootProps<T> = $props()

  const [presenceProps, comboboxProps] = $derived(splitPresenceProps(props))
  const [useComboboxProps, localProps] = $derived(
    createSplitProps<UseComboboxProps<T>>()(comboboxProps, [
      'allowCustomValue',
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
      if (open != null) open = details.open
    },
    onValueChange(details) {
      useComboboxProps.onValueChange?.(details)
      if (value != null) value = details.value
    },
    onInputValueChange(details) {
      useComboboxProps.onInputValueChange?.(details)
      if (inputValue != null) inputValue = details.inputValue
    },
  }))

  const combobox = useCombobox(() => machineProps)
  const presence = usePresence(() => ({ present: combobox().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(combobox().getRootProps(), localProps))

  ComboboxProvider(combobox)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
