import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export type SelectItemTextBaseProps = {}
export interface SelectItemTextProps extends HTMLArkProps<'span'>, SelectItemTextBaseProps {}

export const SelectItemText = forwardRef<HTMLDivElement, SelectItemTextProps>((props, ref) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(select.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SelectItemText.displayName = 'SelectItemText'
