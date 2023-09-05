import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'

export type SelectProps = Assign<
  UseSelectProps,
  {
    children?: ReactNode | ((state: UseSelectReturn) => ReactNode)
  }
>

export const Select = (props: SelectProps) => {
  const [useSelectProps, { children }] = createSplitProps<UseSelectProps>()(props, [
    'closeOnSelect',
    'collection',
    'defaultValue',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'highlightedValue',
    'id',
    'ids',
    'invalid',
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
