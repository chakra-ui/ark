import { mergeProps } from '@zag-js/react'
import { forwardRef, type JSX } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { type Assign, type CollectionItem } from '../types'
import { useSelect, type UseSelectProps } from './use-select'
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
  const context = useSelect(useSelectProps)
  const presenceApi = usePresence(mergeProps({ present: context.isOpen }, presenceProps))

  const mergedProps = mergeProps(context.rootProps, localProps)

  return (
    <SelectProvider value={context}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </SelectProvider>
  )
}

export interface SelectComponent {
  <T extends CollectionItem>(
    props: SelectRootProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const SelectRoot = forwardRef(SelectImpl) as SelectComponent
