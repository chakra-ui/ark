import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { SelectProvider } from './select-context'
import {
  useSelect,
  type CollectionItem,
  type UseSelectProps,
  type UseSelectReturn,
} from './use-select'

export type SelectProps<T extends CollectionItem> = Assign<
  Omit<ComponentPropsWithoutRef<typeof ark.div>, 'children'>,
  UseSelectProps<T>
> & {
  children?: ReactNode | ((state: UseSelectReturn<T>) => ReactNode)
}

// const SelectImpl = <T extends CollectionItem>(props: SelectProps<T>, ref: any) => {
export const Select = <T extends CollectionItem>(props: SelectProps<T>) => {
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
  const api = useSelect(useSelectProps)
  const view = runIfFn(children, api)
  // const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <SelectProvider value={api}>
      {/* <ark.div {...mergedProps} ref={ref}> */}
      {view}
      {/* </ark.div> */}
    </SelectProvider>
  )
}

// export const Select = forwardRef(SelectImpl) as typeof SelectImpl

// Select.displayName = 'Select'
