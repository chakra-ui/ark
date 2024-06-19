import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

export interface ComboboxItemTextBaseProps extends PolymorphicProps {}
export interface ComboboxItemTextProps extends HTMLProps<'span'>, ComboboxItemTextBaseProps {}

export const ComboboxItemText = forwardRef<HTMLDivElement, ComboboxItemTextProps>((props, ref) => {
  const combobox = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(combobox.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

ComboboxItemText.displayName = 'ComboboxItemText'
