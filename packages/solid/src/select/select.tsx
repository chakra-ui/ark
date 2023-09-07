import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
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
  const [selectProps, localProps] = createSplitProps<UseSelectProps>()(props, [
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

  const api = useSelect(selectProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <SelectProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </SelectProvider>
  )
}
