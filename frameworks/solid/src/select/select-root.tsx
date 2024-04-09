import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import type { Assign, CollectionItem } from '../types'
import { useSelect, type UseSelectProps } from './use-select'
import { SelectProvider } from './use-select-context'

export interface SelectRootProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseSelectProps<T>>,
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

  return (
    <SelectProvider value={api}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </SelectProvider>
  )
}
