'use client'

import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { CollectionItem } from '../collection/index.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.ts'
import { type UseSelectProps, useSelect } from './use-select.ts'
import { SelectProvider } from './use-select-context.ts'

export interface SelectRootBaseProps<T extends CollectionItem>
  extends UseSelectProps<T>, UsePresenceProps, PolymorphicProps {}
export interface SelectRootProps<T extends CollectionItem> extends Assign<HTMLProps<'div'>, SelectRootBaseProps<T>> {}

const SelectImpl = <T extends CollectionItem>(props: SelectRootProps<T>, ref: React.Ref<HTMLDivElement>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps<T>>()(selectProps, [
    'alignItemWithTrigger',
    'closeOnSelect',
    'collection',
    'defaultHighlightedValue',
    'defaultOpen',
    'defaultValue',
    'deselectable',
    'disabled',
    'form',
    'highlightedValue',
    'id',
    'ids',
    'initialFocusEl',
    'invalid',
    'loopFocus',
    'multiple',
    'name',
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onSelect',
    'onValueChange',
    'open',
    'popupType',
    'positioning',
    'readOnly',
    'required',
    'scrollToIndexFn',
    'translations',
    'autoComplete',
    'value',
  ])
  const select = useSelect(useSelectProps)
  const presence = usePresence(mergeProps({ present: select.open }, presenceProps))
  const mergedProps = mergeProps(select.getRootProps(), localProps)

  return (
    <SelectProvider value={select}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </SelectProvider>
  )
}

export type SelectRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
  SelectRootProps<T>,
  P
> &
  React.RefAttributes<HTMLDivElement>

export type SelectRootComponent<P = {}> = <T extends CollectionItem>(
  props: SelectRootComponentProps<T, P>,
) => JSX.Element

export const SelectRoot = forwardRef(SelectImpl) as SelectRootComponent
