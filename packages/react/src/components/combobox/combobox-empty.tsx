import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { comboboxAnatomy } from './combobox.anatomy'
import { useComboboxContext } from './use-combobox-context'

const parts = comboboxAnatomy.build()

export interface ComboboxEmptyBaseProps extends PolymorphicProps {}
export interface ComboboxEmptyProps extends HTMLProps<'div'>, ComboboxEmptyBaseProps {}

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>((props, ref) => {
  const combobox = useComboboxContext()

  if (combobox.collection.size !== 0) {
    return null
  }

  return <ark.div {...parts.empty.attrs} {...props} role="presentation" ref={ref} />
})

ComboboxEmpty.displayName = 'ComboboxEmpty'
