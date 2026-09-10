'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from '../field/index.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import type { InputState } from '@zag-js/password-input'

export interface PasswordInputInputState extends InputState {}

export interface PasswordInputInputBaseProps extends PolymorphicProps<PasswordInputInputState> {}
export interface PasswordInputInputProps extends HTMLProps<'input'>, PasswordInputInputBaseProps {}

export const PasswordInputInput = forwardRef<HTMLInputElement, PasswordInputInputProps>((props, ref) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(passwordInput.getInputProps(), props)
  const field = useFieldContext()

  return (
    <ark.input
      aria-describedby={field?.ariaDescribedby}
      {...mergedProps}
      ref={ref}
      state={passwordInput.getInputState()}
    />
  )
})

PasswordInputInput.displayName = 'PasswordInputInput'
