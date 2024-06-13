import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export type SelectIndicatorBaseProps = {}
export interface SelectIndicatorProps extends HTMLArkProps<'div'>, SelectIndicatorBaseProps {}

export const SelectIndicator = forwardRef<HTMLDivElement, SelectIndicatorProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectIndicator.displayName = 'SelectIndicator'
