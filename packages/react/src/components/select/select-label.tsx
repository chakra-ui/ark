import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectLabelBaseProps extends PolymorphicProps {}
export interface SelectLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    SelectLabelBaseProps {}

export const SelectLabel = forwardRef<HTMLLabelElement, SelectLabelProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

SelectLabel.displayName = 'SelectLabel'
