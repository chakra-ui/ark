import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectControlBaseProps extends PolymorphicProps {}
export interface CascadeSelectControlProps extends HTMLProps<'div'>, CascadeSelectControlBaseProps {}

export const CascadeSelectControl = forwardRef<HTMLDivElement, CascadeSelectControlProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CascadeSelectControl.displayName = 'CascadeSelectControl'
