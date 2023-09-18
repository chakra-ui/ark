import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign, CollectionItem } from '../types'
import { ComboboxProvider, type ComboboxContext } from './combobox-context'
import { useCombobox, type UseComboboxProps } from './use-combobox'

export type ComboboxProps<T extends CollectionItem> = Assign<
  HTMLArkProps<'div'>,
  UseComboboxProps<T>
> & {
  children?: JSX.Element | ((context: ComboboxContext<T>) => JSX.Element)
}

export const Combobox = <T extends CollectionItem>(props: ComboboxProps<T>) => {
  const [selectProps, localProps] = createSplitProps<UseComboboxProps<T>>()(props, [
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

  const api = useCombobox(selectProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <ComboboxProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </ComboboxProvider>
  )
}
