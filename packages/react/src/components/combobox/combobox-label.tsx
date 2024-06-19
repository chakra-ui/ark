import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxLabelBaseProps extends PolymorphicProps {}
export interface ComboboxLabelProps extends HTMLProps<'label'>, ComboboxLabelBaseProps {}

export const ComboboxLabel = forwardRef<HTMLLabelElement, ComboboxLabelProps>((props, ref) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

ComboboxLabel.displayName = 'ComboboxLabel'
