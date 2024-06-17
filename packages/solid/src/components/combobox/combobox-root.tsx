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
import { type UseComboboxProps, useCombobox } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

export interface ComboboxRootBaseProps<T extends CollectionItem>
  extends UseComboboxProps<T>,
    UsePresenceProps,
    PolymorphicProps<'div'> {}
export interface ComboboxRootProps<T extends CollectionItem>
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ComboboxRootBaseProps<T> {}

export const ComboboxRoot = <T extends CollectionItem>(props: ComboboxRootProps<T>) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [useComboboxProps, localProps] = createSplitProps<UseComboboxProps<T>>()(comboboxProps, [
    'allowCustomValue',
    'autoFocus',
    'closeOnSelect',
    'composite',
    'defaultOpen',
    'defaultValue',
    'disabled',
    'disableLayer',
    'form',
    'getSelectionValue',
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
    'loopFocus',
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
    'open',
    'openOnChange',
    'openOnClick',
    'openOnKeyPress',
    'placeholder',
    'positioning',
    'readOnly',
    'scrollToIndexFn',
    'selectionBehavior',
    'translations',
    'value',
  ])

  const api = useCombobox(useComboboxProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <ComboboxProvider value={api}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </ComboboxProvider>
  )
}
