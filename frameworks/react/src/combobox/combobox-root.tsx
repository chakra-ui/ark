import { mergeProps } from '@zag-js/react'
import { forwardRef, type JSX, type Ref, type RefAttributes } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { type Assign, type CollectionItem } from '../types'
import { useCombobox, type UseComboboxProps } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

export interface ComboboxRootProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseComboboxProps<T>>,
    UsePresenceProps {}

const ComboboxImpl = <T extends CollectionItem>(
  props: ComboboxRootProps<T>,
  ref: Ref<HTMLDivElement>,
) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [useComboboxProps, localProps] = createSplitProps<UseComboboxProps<T>>()(comboboxProps, [
    'allowCustomValue',
    'autoFocus',
    'closeOnSelect',
    'defaultValue',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'highlightedValue',
    'id',
    'ids',
    'inputBehavior',
    'inputValue',
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
    'onInputValueChange',
    'onInteractOutside',
    'onOpenChange',
    'onOpenChange',
    'onPointerDownOutside',
    'onValueChange',
    'openOnClick',
    'placeholder',
    'positioning',
    'readOnly',
    'selectionBehavior',
    'selectOnBlur',
    'translations',
    'value',
  ])
  const combobox = useCombobox(useComboboxProps)
  const presence = usePresence(mergeProps({ present: combobox.isOpen }, presenceProps))
  const mergedProps = mergeProps(combobox.rootProps, localProps)

  return (
    <ComboboxProvider value={combobox}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </ComboboxProvider>
  )
}

export interface ComboboxComponent {
  <T extends CollectionItem>(
    props: ComboboxRootProps<T> & RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const ComboboxRoot = forwardRef(ComboboxImpl) as ComboboxComponent
