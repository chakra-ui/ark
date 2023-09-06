import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'

export type SelectProps<T> = Assign<
  UseSelectProps<T>,
  {
    children?: ReactNode | ((state: UseSelectReturn<T>) => ReactNode)
  }
>

export function Select<T>(props: SelectProps<T>) {
  const [useSelectProps, { children }] = createSplitProps<UseSelectProps<T>>()(props, [
    'closeOnSelect',
    'defaultValue',
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
    'onChange',
    'onClose',
    'onFocusOutside',
    'onHighlight',
    'onInteractOutside',
    'onOpen',
    'onPointerDownOutside',
    'open',
    'positioning',
    'readOnly',
    'selectOnBlur',
    'value',
  ])
  const select = useSelect(useSelectProps)
  const view = runIfFn(children, select)

  return <SelectProvider value={select}>{view}</SelectProvider>
}
