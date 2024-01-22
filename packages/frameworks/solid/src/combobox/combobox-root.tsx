import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import type { Assign, CollectionItem } from '../types'
import { ComboboxProvider } from './combobox-context'
import { useCombobox, type UseComboboxProps, type UseComboboxReturn } from './use-combobox'

export interface ComboboxRootProps<T extends CollectionItem>
  extends Assign<
      Assign<
        HTMLArkProps<'div'>,
        { children?: JSX.Element | ((api: UseComboboxReturn<T>) => JSX.Element) }
      >,
      UseComboboxProps<T>
    >,
    UsePresenceProps {}

export const ComboboxRoot = <T extends CollectionItem>(props: ComboboxRootProps<T>) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [useComboboxProps, localProps] = createSplitProps<UseComboboxProps<T>>()(comboboxProps, [
    'allowCustomValue',
    'autoFocus',
    'closeOnSelect',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'highlightedValue',
    'id',
    'ids',
    'inputBehavior',
    'inputValue',
    'invalid',
    'isItemDisabled',
    'items',
    'itemToString',
    'itemToValue',
    'loop',
    'multiple',
    'name',
    'onFocusOutside',
    'onHighlightChange',
    'onInputValueChange',
    'onInteractOutside',
    'onOpenChange',
    'onOpenChange',
    'onPointerDownOutside',
    'onValueChange',
    'openOnClick',
    'placeholder',
    'positioning',
    'readOnly',
    'selectionBehavior',
    'selectOnBlur',
    'translations',
    'value',
  ])

  const api = useCombobox(useComboboxProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <ComboboxProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
    </ComboboxProvider>
  )
}
