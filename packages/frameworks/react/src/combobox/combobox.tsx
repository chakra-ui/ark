import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign, type CollectionItem } from '../types'
import { ComboboxProvider } from './combobox-context'
import { useCombobox, type UseComboboxProps, type UseComboboxReturn } from './use-combobox'

export interface ComboboxProps<T extends CollectionItem>
  extends Assign<
    HTMLArkProps<'div'>,
    UseComboboxProps<T> & {
      children?: ReactNode | ((state: UseComboboxReturn<T>) => ReactNode)
    }
  > {}

const ComboboxImpl = <T extends CollectionItem>(
  props: ComboboxProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [useComboboxProps, { children, ...localProps }] = createSplitProps<UseComboboxProps<T>>()(
    props,
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
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <ComboboxProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </ComboboxProvider>
  )
}

export interface ComboboxComponent {
  <T extends CollectionItem>(
    props: ComboboxProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const Combobox = forwardRef(ComboboxImpl) as ComboboxComponent
