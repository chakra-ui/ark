import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const SwitchInput = forwardRef<HTMLInputElement, SwitchInputProps>((props, ref) => {
  const { inputProps } = useSwitchContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

SwitchInput.displayName = 'SwitchInput'
