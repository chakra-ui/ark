import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectLabelBaseProps extends PolymorphicProps {}
export interface CascadeSelectLabelProps extends HTMLProps<'label'>, CascadeSelectLabelBaseProps {}

export const CascadeSelectLabel = forwardRef<HTMLLabelElement, CascadeSelectLabelProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

CascadeSelectLabel.displayName = 'CascadeSelectLabel'
