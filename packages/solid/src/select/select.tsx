import { type Assign } from '@polymorphic-factory/solid'
import { children } from 'solid-js'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { SelectProvider, useSelectContext, type SelectContext } from './select-context'
import { useSelect, type UseSelectProps } from './use-select'

export type SelectProps = Assign<
  UseSelectProps,
  {
    children?: JSX.Element | ((context: SelectContext) => JSX.Element)
  }
>

export const Select = (props: SelectProps) => {
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps>()(props, [
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
  const select = useSelect(useSelectProps)

  return (
    <SelectProvider value={select}>
      <SelectContextWrapper {...localProps} />
    </SelectProvider>
  )
}

// Children need to be wrapped in a function so that the context is available
const SelectContextWrapper = (props: Pick<SelectProps, 'children'>) => {
  const select = useSelectContext()
  const view = children(() => runIfFn(props.children, select))

  return <>{view()}</>
}
