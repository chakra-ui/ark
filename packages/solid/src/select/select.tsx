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
  const [selectParams, restProps] = createSplitProps<UseSelectProps>()(props, [
    'closeOnSelect',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'highlightedOption',
    'id',
    'ids',
    'invalid',
    'loop',
    'name',
    'onChange',
    'onClose',
    'onHighlight',
    'onInteractOutside',
    'onOpen',
    'positioning',
    'readOnly',
    'selectOnTab',
    'selectedOption',
  ])

  const api = useSelect(selectParams)
  const getChildren = () => runIfFn(restProps.children, api)

  return <SelectProvider value={api}>{getChildren()}</SelectProvider>
}
