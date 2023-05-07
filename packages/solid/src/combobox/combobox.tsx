import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { ComboboxProvider, useComboboxContext, type ComboboxContext } from './combobox-context'
import { useCombobox, type UseComboboxProps } from './use-combobox'

export type ComboboxProps = Assign<ComboboxContextWrapperProps, UseComboboxProps>

export const Combobox = (props: ComboboxProps) => {
  const [useComboboxProps, divProps] = createSplitProps<UseComboboxProps>()(props, [
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

  return (
    <ComboboxProvider value={combobox}>
      <ComboboxContextWrapper {...divProps} />
    </ComboboxProvider>
  )
}

type ComboboxContextWrapperProps = Assign<
  HTMLArkProps<'div'>,
  {
    children: JSX.Element | ((context: ComboboxContext) => JSX.Element)
  }
>

const ComboboxContextWrapper = (props: ComboboxContextWrapperProps) => {
  const combobox = useComboboxContext()
  const view = children(() => runIfFn(props.children, combobox))

  return (
    <ark.div {...combobox().rootProps} {...props}>
      {view()}
    </ark.div>
  )
}
