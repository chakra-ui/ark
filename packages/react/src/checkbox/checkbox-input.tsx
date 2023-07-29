import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>((props, ref) => {
  const { inputProps } = useCheckboxContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

CheckboxInput.displayName = 'CheckboxInput'
