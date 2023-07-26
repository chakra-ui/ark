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
    'onHighlight',
    'onInputChange',
    'onInputChange',
    'onInteractOutside',
    'onOpen',
    'onSelect',
    'openOnClick',
    'placeholder',
    'positioning',
    'readOnly',
    'selectInputOnFocus',
    'selectOnTab',
    'selectionBehavior',
    'selectionData',
    'translations',
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
