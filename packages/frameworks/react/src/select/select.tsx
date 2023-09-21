import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign, type CollectionItem } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'

export interface SelectProps<T extends CollectionItem>
  extends Assign<
    HTMLArkProps<'div'>,
    UseSelectProps<T> & {
      children?: ReactNode | ((state: UseSelectReturn<T>) => ReactNode)
    }
  > {}

const SelectImpl = <T extends CollectionItem>(
  props: SelectProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
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
    ],
  )
  const api = useSelect(useSelectProps)
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <SelectProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </SelectProvider>
  )
}

export interface SelectComponent {
  <T extends CollectionItem>(
    props: SelectProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const Select = forwardRef(SelectImpl) as SelectComponent
