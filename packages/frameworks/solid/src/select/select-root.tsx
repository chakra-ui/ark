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

export interface SelectRootProps<T extends CollectionItem>
  extends Assign<
      Assign<
        HTMLArkProps<'div'>,
        { children?: JSX.Element | ((api: UseSelectReturn<T>) => JSX.Element) }
      >,
      UseSelectProps<T>
    >,
    UsePresenceProps {}

export const SelectRoot = <T extends CollectionItem>(props: SelectRootProps<T>) => {
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
    'scrollToIndexFn',
    'selectOnBlur',
    'value',
  ])

  const api = useSelect(useSelectProps)
  const presenceApi = usePresence(mergeProps(() => ({ present: api().isOpen }), presenceProps))
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <SelectProvider value={api}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
    </SelectProvider>
  )
}
