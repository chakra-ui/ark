import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import { type Assign, type CollectionItem } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'

export interface SelectProps<T extends CollectionItem>
  extends Assign<
      Assign<
        HTMLArkProps<'div'>,
        { children?: ReactNode | ((api: UseSelectReturn<T>) => ReactNode) }
      >,
      UseSelectProps<T>
    >,
    UsePresenceProps {}

const SelectImpl = <T extends CollectionItem>(
  props: SelectProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [useSelectProps, { children, ...localProps }] = createSplitProps<UseSelectProps<T>>()(
    selectProps,
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
  const presenceApi = usePresence(mergeProps({ present: api.isOpen }, presenceProps))
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <SelectProvider value={api}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
      </PresenceProvider>
    </SelectProvider>
  )
}

export interface SelectComponent {
  <T extends CollectionItem>(
    props: SelectProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const Select = forwardRef(SelectImpl) as SelectComponent
