import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import type { Assign, CollectionItem } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'

export interface SelectProps<T extends CollectionItem>
  extends Assign<
      Assign<
        HTMLArkProps<'div'>,
        {
          children?: JSX.Element | ((state: UseSelectReturn<T>) => JSX.Element)
        }
      >,
      UseSelectProps<T>
    >,
    UsePresenceProps {}

export const Select = <T extends CollectionItem>(props: SelectProps<T>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps<T>>()(selectProps, [
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
  ])

  const api = useSelect(useSelectProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <SelectProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
    </SelectProvider>
  )
}
