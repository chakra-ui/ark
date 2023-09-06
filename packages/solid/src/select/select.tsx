import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SelectProvider, type SelectContext } from './select-context'
import { useSelect, type UseSelectProps } from './use-select'

export type SelectProps = Assign<
  UseSelectProps,
  {
    children?: JSX.Element | ((context: SelectContext) => JSX.Element)
  }
>

export const Select = (props: SelectProps) => {
  const [selectParams, localProps] = createSplitProps<UseSelectProps>()(props, [
    'closeOnSelect',
    'collection',
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

  const api = useSelect(selectParams)
  const getChildren = () => runIfFn(localProps.children, api)

  return <SelectProvider value={api}>{getChildren()}</SelectProvider>
}
