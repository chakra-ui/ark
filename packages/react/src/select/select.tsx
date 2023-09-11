import { mergeProps } from '@zag-js/react'
import type { CollectionItem } from '@zag-js/select'
import type { ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'

export type SelectProps<T extends CollectionItem> = Assign<
  HTMLArkProps<'div'>,
  UseSelectProps<T>
> & {
  children?: ReactNode | ((state: UseSelectReturn<T>) => ReactNode)
}

// const SelectImpl = <T extends CollectionItem>(props: SelectProps<T>, ref: any) => {
export const Select = <T extends CollectionItem>(props: SelectProps<T>) => {
  const [useSelectProps, { children, ...localProps }] = createSplitProps<UseSelectProps<T>>()(
    props,
    [
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
    ],
  )
  const api = useSelect(useSelectProps)
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <SelectProvider value={api}>
      <ark.div {...mergedProps}>{view}</ark.div>
    </SelectProvider>
  )
}

// export const Select = forwardRef(SelectImpl) as typeof SelectImpl

// Select.displayName = 'Select'
