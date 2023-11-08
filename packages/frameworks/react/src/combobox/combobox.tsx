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
import { ComboboxProvider } from './combobox-context'
import { useCombobox, type UseComboboxProps, type UseComboboxReturn } from './use-combobox'

export interface ComboboxProps<T extends CollectionItem>
  extends Assign<
      Assign<
        HTMLArkProps<'div'>,
        { children?: ReactNode | ((api: UseComboboxReturn<T>) => ReactNode) }
      >,
      UseComboboxProps<T>
    >,
    UsePresenceProps {}

const ComboboxImpl = <T extends CollectionItem>(
  props: ComboboxProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [presenceProps, comboboxProps] = splitPresenceProps(props)
  const [useComboboxProps, { children, ...localProps }] = createSplitProps<UseComboboxProps<T>>()(
    comboboxProps,
    [
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
    ],
  )
  const api = useCombobox(useComboboxProps)
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <ComboboxProvider value={api}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
      </PresenceProvider>
    </ComboboxProvider>
  )
}

export interface ComboboxComponent {
  <T extends CollectionItem>(
    props: ComboboxProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const Combobox = forwardRef(ComboboxImpl) as ComboboxComponent
