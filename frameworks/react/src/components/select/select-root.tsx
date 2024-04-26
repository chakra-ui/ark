import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import type { Assign, CollectionItem } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseSelectProps, useSelect } from './use-select'
import { SelectProvider } from './use-select-context'

export interface SelectRootProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseSelectProps<T>>,
    UsePresenceProps {}

const SelectImpl = <T extends CollectionItem>(
  props: SelectRootProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps<T>>()(selectProps, [
    'closeOnSelect',
    'defaultValue',
    'disabled',
    'form',
    'highlightedValue',
    'id',
    'ids',
    'invalid',
    'isItemDisabled',
    'items',
    'itemToString',
    'itemToValue',
    'loopFocus',
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
    'value',
  ])
  const select = useSelect(useSelectProps)
  const presence = usePresence(mergeProps({ present: select.open }, presenceProps))
  const mergedProps = mergeProps(select.rootProps, localProps)

  return (
    <SelectProvider value={select}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </SelectProvider>
  )
}

export type SelectComponent = <T extends CollectionItem>(
  props: SelectRootProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const SelectRoot = forwardRef(SelectImpl) as SelectComponent
