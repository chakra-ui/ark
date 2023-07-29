import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>((props, ref) => {
  const { getRadioInputProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getRadioInputProps(context), props)

  return <ark.input {...mergedProps} ref={ref} />
})

RadioInput.displayName = 'RadioInput'
