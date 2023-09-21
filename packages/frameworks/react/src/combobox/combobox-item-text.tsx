import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'
import { useComboboxItemContext } from './combobox-item-context'

export interface ComboboxItemTextProps extends HTMLArkProps<'span'> {}

export const ComboboxItemText = forwardRef<HTMLDivElement, ComboboxItemTextProps>((props, ref) => {
  const api = useComboboxContext()
  const itemProps = useComboboxItemContext()
  const mergedProps = mergeProps(api.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

ComboboxItemText.displayName = 'ComboboxItemText'
