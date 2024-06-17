import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectListBaseProps extends PolymorphicProps {}
export interface SelectListProps extends HTMLProps<'div'>, SelectListBaseProps {}

export const SelectList = forwardRef<HTMLDivElement, SelectListProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectList.displayName = 'SelectList'
