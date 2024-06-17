import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import type { CollectionItem } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseSelectProps, useSelect } from './use-select'
import { SelectProvider } from './use-select-context'

export interface SelectRootBaseProps<T extends CollectionItem>
  extends UseSelectProps<T>,
    UsePresenceProps,
    PolymorphicProps<'div'> {}
export interface SelectRootProps<T extends CollectionItem>
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SelectRootBaseProps<T> {}

export const SelectRoot = <T extends CollectionItem>(props: SelectRootProps<T>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps<T>>()(selectProps, [
    'closeOnSelect',
    'composite',
    'defaultOpen',
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
  const presenceApi = usePresence(mergeProps(() => ({ present: select().open }), presenceProps))
  const mergedProps = mergeProps(() => select().getRootProps(), localProps)

  return (
    <SelectProvider value={select}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </SelectProvider>
  )
}
