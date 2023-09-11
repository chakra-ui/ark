import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ComboboxProvider } from './combobox-context'
import { useCombobox, type UseComboboxProps, type UseComboboxReturn } from './use-combobox'

export type ComboboxProps = Assign<Omit<HTMLArkProps<'div'>, 'children'>, UseComboboxProps> & {
  children?: React.ReactNode | ((props: UseComboboxReturn) => React.ReactNode)
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>((props, ref) => {
  const [useComboboxProps, { children, ...divProps }] = createSplitProps<UseComboboxProps>()(
    props,
    [
      'allowCustomValue',
      'ariaHidden',
      'autoFocus',
      'blurOnSelect',
      'dir',
      'disabled',
      'focusOnClear',
      'form',
      'getRootNode',
      'id',
      'ids',
      'inputBehavior',
      'inputValue',
      'invalid',
      'isCustomValue',
      'loop',
      'name',
      'onClose',
      'onFocusOutside',
      'onHighlight',
      'onInputChange',
      'onInputChange',
      'onInteractOutside',
      'onOpen',
      'onPointerDownOutside',
      'onSelect',
      'openOnClick',
      'placeholder',
      'positioning',
      'readOnly',
      'selectionBehavior',
      'selectionData',
      'selectOnTab',
      'translations',
    ],
  )

  const combobox = useCombobox(useComboboxProps)
  const mergedProps = mergeProps(combobox.rootProps, divProps)

  const view = runIfFn(children, combobox)
  return (
    <ComboboxProvider value={combobox}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </ComboboxProvider>
  )
})

Combobox.displayName = 'Combobox'
