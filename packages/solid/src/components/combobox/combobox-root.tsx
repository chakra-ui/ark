import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js/jsx-runtime'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { type UseComboboxProps, useCombobox } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'
import type { CollectionItem } from '../collection'

export interface ComboboxRootBaseProps<T extends CollectionItem>
  extends UseComboboxProps<T>,
    UsePresenceProps,
    PolymorphicProps<'div'> {}

export interface ComboboxRootProps<T extends CollectionItem>
  extends Omit<HTMLProps<'div'>, 'onSelect'>,
    ComboboxRootBaseProps<T> {}

export const ComboboxRoot = <T extends CollectionItem>(props: ComboboxRootProps<T>) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [useComboboxProps, localProps] = createSplitProps<UseComboboxProps<T>>()(comboboxProps, [
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
    'onValueChange',
    'onSelect',
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
  ])

  const api = useCombobox(useComboboxProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <ComboboxProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ComboboxProvider>
  )
}

export type ComboboxRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
  ComboboxRootProps<T>,
  P
>

export type ComboboxRootComponent<P = {}> = <T extends CollectionItem>(
  props: ComboboxRootComponentProps<T, P>,
) => JSX.Element
