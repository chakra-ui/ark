import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldsetContext } from './use-fieldset-context'

export interface FieldsetLegendBaseProps extends PolymorphicProps {}
export interface FieldsetLegendProps extends HTMLProps<'div'>, FieldsetLegendBaseProps {}

export const FieldsetLegend = forwardRef<HTMLDivElement, FieldsetLegendProps>((props, ref) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(fieldset.getLegendProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

FieldsetLegend.displayName = 'FieldsetLegend'
