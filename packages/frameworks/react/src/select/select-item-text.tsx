import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'
import { useSelectItemContext } from './select-item-context'

export interface SelectItemTextProps extends HTMLArkProps<'span'> {}

export const SelectItemText = forwardRef<HTMLDivElement, SelectItemTextProps>((props, ref) => {
  const api = useSelectContext()
  const itemProps = useSelectItemContext()
  const mergedProps = mergeProps(api.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SelectItemText.displayName = 'SelectItemText'
