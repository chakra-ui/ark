import type { Assign } from '@polymorphic-factory/solid'
import { children } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { SelectProvider, useSelectContext, type SelectContext } from './select-context'
import { useSelect, UseSelectProps } from './use-select'

export type SelectProps = Assign<
  UseSelectProps,
  {
    children: JSX.Element
  }
>

export const Select = (props: SelectProps) => {
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps>()(props, [
    'closeOnSelect',
    'defaultValue',
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
    'onOpen',
    'positioning',
    'readOnly',
    'selectOnTab',
    'selectedOption',
  ])
  const select = useSelect(useSelectProps)

  return <SelectProvider value={select}>{localProps.children}</SelectProvider>
}

export const SelectContextWrapper = (props: any) => {
  const [localProps, divProps] = createSplitProps<{
    children: JSX.Element | ((context: SelectContext) => JSX.Element)
    renderIcon?: never
  }>()(props, ['renderIcon', 'children'])

  const select = useSelectContext()
  const view = children(() => runIfFn(localProps.children, select))

  return <ark.div>{view()}</ark.div>
}
