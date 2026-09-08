'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseCheckboxReturn } from './use-checkbox.ts'
import { CheckboxProvider } from './use-checkbox-context.ts'
import type { RootState } from '@zag-js/checkbox'

interface RootProviderProps {
  value: UseCheckboxReturn
}

export interface CheckboxRootProviderState extends RootState {}

export interface CheckboxRootProviderBaseProps extends RootProviderProps, PolymorphicProps<CheckboxRootProviderState> {}
export interface CheckboxRootProviderProps extends HTMLProps<'label'>, CheckboxRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const CheckboxRootProvider = forwardRef<HTMLLabelElement, CheckboxRootProviderProps>((props, ref) => {
  const [{ value: checkbox }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(checkbox.getRootProps(), localProps)

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...mergedProps} ref={ref} state={checkbox.getRootState()} />
    </CheckboxProvider>
  )
})

CheckboxRootProvider.displayName = 'CheckboxRootProvider'
