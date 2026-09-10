'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UsePasswordInputProps, usePasswordInput } from './use-password-input.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'
import type { RootState } from '@zag-js/password-input'

export interface PasswordInputRootState extends RootState {}

export interface PasswordInputRootBaseProps extends UsePasswordInputProps, PolymorphicProps<PasswordInputRootState> {}
export interface PasswordInputRootProps extends Assign<HTMLProps<'div'>, PasswordInputRootBaseProps> {}

const splitRootProps = createSplitProps<UsePasswordInputProps>()

export const PasswordInputRoot = forwardRef<HTMLDivElement, PasswordInputRootProps>((props, ref) => {
  const [usePasswordInputProps, localProps] = splitRootProps(props, [
    'autoComplete',
    'defaultVisible',
    'disabled',
    'id',
    'ids',
    'ignorePasswordManagers',
    'invalid',
    'name',
    'onVisibilityChange',
    'readOnly',
    'required',
    'translations',
    'visible',
  ])
  const passwordInput = usePasswordInput(usePasswordInputProps)
  const mergedProps = mergeProps(passwordInput.getRootProps(), localProps)

  return (
    <PasswordInputProvider value={passwordInput}>
      <ark.div {...mergedProps} ref={ref} state={passwordInput.getRootState()} />
    </PasswordInputProvider>
  )
})

PasswordInputRoot.displayName = 'PasswordInputRoot'
