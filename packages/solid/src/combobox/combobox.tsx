import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { ComboboxProvider, type ComboboxContext } from './combobox-context'
import { useCombobox, type UseComboboxProps } from './use-combobox'

export type ComboboxProps = Assign<
  HTMLArkProps<'div'>,
  UseComboboxProps & {
    children: JSX.Element | ((context: ComboboxContext) => JSX.Element)
  }
>

export const Combobox = (props: ComboboxProps) => {
  const [useComboboxProps, localProps] = createSplitProps<UseComboboxProps>()(props, [
    'allowCustomValue',
    'autoFocus',
    'closeOnSelect',
    'collection',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'highlightedValue',
    'id',
    'ids',
    'inputBehavior',
    'inputValue',
    'inputValue',
    'invalid',
    'loop',
    'multiple',
    'name',
    'onChange',
    'onClose',
    'onFocusOutside',
    'onHighlight',
    'onInputChange',
    'onInputChange',
    'onInteractOutside',
    'onOpen',
    'onPointerDownOutside',
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
  const rootProps = mergeProps(() => combobox().rootProps, localProps)

  const getChildren = () => runIfFn(localProps.children, combobox)

  return (
    <ComboboxProvider value={combobox}>
      <ark.div {...rootProps}>{getChildren()}</ark.div>
    </ComboboxProvider>
  )
}
