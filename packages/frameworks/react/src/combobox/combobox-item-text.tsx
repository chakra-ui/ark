import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-context'

export interface ComboboxItemTextProps extends HTMLArkProps<'span'> {}

export const ComboboxItemText = forwardRef<HTMLDivElement, ComboboxItemTextProps>((props, ref) => {
  const context = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(context.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

ComboboxItemText.displayName = 'ComboboxItemText'
