import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign, CollectionItem } from '../types'
import { SelectProvider, type SelectContext } from './select-context'
import { useSelect, type UseSelectProps } from './use-select'

export type SelectProps<T extends CollectionItem> = Assign<
  HTMLArkProps<'div'>,
  UseSelectProps<T>
> & {
  children?: JSX.Element | ((context: SelectContext<T>) => JSX.Element)
}

export const Select = <T extends CollectionItem>(props: SelectProps<T>) => {
  const [selectProps, localProps] = createSplitProps<UseSelectProps<T>>()(props, [
    'closeOnSelect',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'highlightedValue',
    'id',
    'ids',
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
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onValueChange',
    'open',
    'positioning',
    'readOnly',
    'selectOnBlur',
    'value',
  ])

  const api = useSelect(selectProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <SelectProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </SelectProvider>
  )
}
