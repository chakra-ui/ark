import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectHiddenInputBaseProps extends PolymorphicProps {}
export interface CascadeSelectHiddenInputProps extends HTMLProps<'input'>, CascadeSelectHiddenInputBaseProps {}

export const CascadeSelectHiddenInput = forwardRef<HTMLInputElement, CascadeSelectHiddenInputProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getHiddenInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

CascadeSelectHiddenInput.displayName = 'CascadeSelectHiddenInput'
