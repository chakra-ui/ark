import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectControlBaseProps extends PolymorphicProps {}
export interface SelectControlProps extends HTMLProps<'div'>, SelectControlBaseProps {}

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})
SelectControl.displayName = 'SelectControl'
