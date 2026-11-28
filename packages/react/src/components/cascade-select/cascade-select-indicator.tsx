import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectIndicatorBaseProps extends PolymorphicProps {}
export interface CascadeSelectIndicatorProps extends HTMLProps<'div'>, CascadeSelectIndicatorBaseProps {}

export const CascadeSelectIndicator = forwardRef<HTMLDivElement, CascadeSelectIndicatorProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CascadeSelectIndicator.displayName = 'CascadeSelectIndicator'
